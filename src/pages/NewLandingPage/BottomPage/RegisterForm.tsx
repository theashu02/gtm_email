import { Check } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import mixpanel from "mixpanel-browser";

type AxiosErrorLike = {
    response?: {
      data?: {
        error?: string;
      };
    };
    message?: string;
};

// Initialize Mixpanel with error handling
let isMixpanelInitialized = false;
try {
  const mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN;
  if (mixpanelToken) {
    mixpanel.init(mixpanelToken, { debug: true });
    isMixpanelInitialized = true;
  } else {
    console.warn("Mixpanel token not found in environment variables");
  }
} catch (error) {
  console.error("Failed to initialize Mixpanel:", error);
}

// Helper function to safely track events
const safeTrackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  try {
    if (isMixpanelInitialized && mixpanel && typeof mixpanel.track === 'function') {
      mixpanel.track(eventName, properties);
    } else {
      console.warn("Mixpanel not available, skipping event tracking:", eventName);
    }
  } catch (error) {
    console.error("Error tracking Mixpanel event:", eventName, error);
  }
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    acceptPolicy: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Track form submission with error handling
    safeTrackEvent("Contact form at home page-Submit Button Clicked", {
      timestamp: new Date().toISOString(),
    });

    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post("/api/send-mail", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        contactNumber: formData.phone,
      });

      if (response.status === 200) {
        // Track successful form submission
        safeTrackEvent("Contact form at home page-Form Submitted Successfully", {
          email: formData.email,
          company: formData.company,
          timestamp: new Date().toISOString(),
        });

        setMessage({
          text: "Thank you! We'll be in touch within 24 hours.",
          type: "success",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          acceptPolicy: false,
        });
      } else {
        // Track form submission error
        safeTrackEvent("Contact form at home page-Form Submission Error", {
          error: response.data.error || "Unknown error",
          timestamp: new Date().toISOString(),
        });

        setMessage({
          text:
            response.data.error || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      safeTrackEvent("Contact form at home page-Form Submission Failed", {
        error:
          typeof error === "object" && error !== null && "response" in error && (error as AxiosErrorLike).response?.data?.error
            ? (error as AxiosErrorLike).response!.data!.error
            : typeof error === "object" && error !== null && "message" in error
            ? (error as AxiosErrorLike).message
            : "Network error",
        timestamp: new Date().toISOString(),
      });

      const errorMessage =
        typeof error === "object" && error !== null && "response" in error && (error as AxiosErrorLike).response?.data?.error
            ? (error as AxiosErrorLike).response!.data!.error || "Failed to submit form. Please try again later."
            : "Failed to submit form. Please try again later.";
        setMessage({
        text: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-7xl bg-black py-12 px-4 font-poppins">
      <h1 className=" text-white mb-6 font-bold text-[43.49px] leading-[100%] tracking-[0%] text-center">
        Explore GTMVantage with us
      </h1>
      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-sm text-white opacity-90 font-light md:text-[16px] leading-[150%] tracking-[0%] text-center">
          Simply complete the form, and our team will get in touch within 24
          hours to demonstrate <br /> how GTMVantage can accelerate your
          business growth. Discover how our end-to-end GTM solutions can <br />{" "}
          streamline your strategy, optimize demand generation, and maximize
          your ROI.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {message.text && (
            <div
              className={`p-3 rounded ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {message.text}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-4 py-3 rounded bg-white text-gray-800 placeholder-gray-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded bg-white text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Business Email"
              required
              className="w-full px-4 py-3 rounded bg-white text-gray-800 placeholder-gray-500"
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              required
              className="w-full px-4 py-3 rounded bg-white text-gray-800 placeholder-gray-500"
            />
          </div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Please let us know how we can help you."
            required
            className="w-full px-4 py-3 rounded bg-white text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded text-white font-medium transition-opacity disabled:opacity-70"
            style={{
              background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
            }}
          >
            {loading ? "SUBMITTING..." : "SUBMIT"}
          </button>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              name="acceptPolicy"
              checked={formData.acceptPolicy}
              onChange={handleChange}
              required
              className="sr-only peer"
            />
            <div className="relative w-5 h-5 bg-white rounded peer-checked:bg-blue-500 transition-colors">
              {formData.acceptPolicy && <Check className="h-5 w-5" />}
            </div>
            <span className="text-sm opacity-90">
              I accept GTMVantage&apos;s{" "}
              <a
                href="/privacy-policy"
                className="hover:text-blue-500 underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </form>
      </div>
    </div>
  );
}