import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Button from "../FirstPage/Button";
import mixpanel from "mixpanel-browser";

// ---- Safe Mixpanel setup (same pattern as Header) ----
const initializeMixpanel = () => {
  try {
    const token = import.meta.env.VITE_MIXPANEL_TOKEN;
    if (token) {
      mixpanel.init(token, { debug: true });
      return true;
    } else {
      console.warn("Mixpanel token not found in environment variables");
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize Mixpanel:", error);
    return false;
  }
};

const isMixpanelInitialized = initializeMixpanel();

const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  try {
    if (isMixpanelInitialized && mixpanel && typeof mixpanel.track === "function") {
      mixpanel.track(eventName, properties);
    } else {
      console.warn("Mixpanel not available, skipping event:", eventName);
    }
  } catch (error) {
    console.error("Error tracking Mixpanel event:", error);
  }
};

// ---- Safe localStorage read (for user context) ----
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user-xcalibure");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const ConsultingPricing = () => {
  const navigate = useNavigate();
  const user = useMemo(getUserFromStorage, []);

  const handleGetStarted = () => {
    // Mixpanel: track "Know More" click
    trackEvent("Know More Clicked - GTM Kickstart Plan", {
      plan: "GTM Kickstart Plan",
      price: 199,
      currency: "USD",
      isLoggedIn: !!user,
      userId: user?._id || null,
      timestamp: new Date().toISOString(),
    });

    navigate("/get-gtm-plans");
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-full shadow-lg p-2 flex flex-col items-center">
      <h3 className="text-2xl font-bold text-black mb-1 text-center">
        GTM Kickstart Plan
      </h3>
      <p className="text-lg text-gray-700 mb-2 text-center">
        Build your GTM and Demand Gen strategy with{" "}
        <span className="font-semibold text-blue-600">AI + expert guidance</span>
      </p>
      <ul className="text-gray-600 mb-4 text-base list-disc list-inside text-left">
        <li>
          Covers up to <span className="font-medium">2 products</span> and{" "}
          <span className="font-medium">5 geographies per product</span>
        </li>
        <li>Includes a ready-to-use plan</li>
        <li>1:1 session with a senior consultant to explain and refine it</li>
      </ul>
      <div className="w-full flex flex-col items-center -mt-2">
        <span className="text-2xl font-bold text-green-700">Just $199</span>
        <span className="text-sm text-gray-500 mb-2">Perfect for early-stage startups</span>
        <Button
          variant="primary"
          size="lg"
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold font-poppins px-6 rounded-lg shadow transition duration-200 text-md"
        >
          Know More
        </Button>
      </div>
    </div>
  );
};

export default ConsultingPricing;
