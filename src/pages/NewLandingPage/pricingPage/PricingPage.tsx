import { useState } from "react";
import PricingCard from "./PricingCard";
import PricingHeader from "./PricingHeader";
import ConsultingPricing from "./ConsultingPricing";
import Button from "../FirstPage/Button";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

// Safe Mixpanel initialization
const initializeMixpanel = () => {
  try {
    if (import.meta.env.VITE_MIXPANEL_TOKEN && typeof mixpanel !== 'undefined') {
      mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: true });
      console.log("Mixpanel initialized successfully");
      return true;
    } else {
      console.warn("Mixpanel token not found or mixpanel not available");
      return false;
    }
  } catch (error) {
    console.error("Failed to initialize Mixpanel:", error);
    return false;
  }
};

// Initialize Mixpanel
const isMixpanelInitialized = initializeMixpanel();

const pricingPlansData = {
  USD: {
    yearly: [
      {
        title: "DIY Plan",
        price: 29,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per year", value: "240" },
          { name: "Product Price Simulations per year", value: "60" },
          { name: "Free Consulting Hours", value: "NIL" },
        ],
      },
      {
        title: "Startup Plan",
        price: 59,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per year", value: "240" },
          { name: "Product Price Simulations per year", value: "60" },
          { name: "Free Consulting Hours per year", value: "12" },
        ],
      },
      {
        title: "Scaleup Plan",
        price: 179,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "25" },
          { name: "Geo per Product", value: "25" },
          { name: "Industries per Product", value: "25" },
          { name: "AI Data Tables Fetch per year", value: "1200" },
          { name: "Product Price Simulations per year", value: "250" },
          { name: "Free Consulting Hours per year", value: "24" },
        ],
      },
      {
        title: "Enterprise Plan",
        price: "ON REQUEST",
        period: "",
        features: [
          { name: "Products", value: "Unlimited" },
          { name: "Geo per Product", value: "Unlimited" },
          { name: "Industries per Product", value: "Unlimited" },
          { name: "AI Data Tables Fetch", value: "Unlimited" },
          { name: "Product Price Simulations", value: "Unlimited" },
          { name: "Free Consulting Hours", value: "On Demand" },
        ],
      },
    ],
    monthly: [
      {
        title: "DIY Plan",
        price: 49,
        period: "Per Month",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per month", value: "20" },
          { name: "Product Price Simulations per month", value: "5" },
          { name: "Free Consulting Hours", value: "NIL" },
        ],
      },
      {
        title: "Startup Plan",
        price: 99,
        period: "Per Month",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per month", value: "20" },
          { name: "Product Price Simulations per month", value: "5" },
          { name: "Free Consulting Hours per month", value: "1" },
        ],
      },
      {
        title: "Scaleup Plan",
        price: 299,
        period: "Per Month",
        features: [
          { name: "Products", value: "25" },
          { name: "Geo per Product", value: "25" },
          { name: "Industries per Product", value: "25" },
          { name: "AI Data Tables Fetch per month", value: "100" },
          { name: "Product Price Simulations per month", value: "20" },
          { name: "Free Consulting Hours per month", value: "2" },
        ],
      },
      {
        title: "Enterprise Plan",
        price: "ON REQUEST",
        period: "",
        features: [
          { name: "Products", value: "Unlimited" },
          { name: "Geo per Product", value: "Unlimited" },
          { name: "Industries per Product", value: "Unlimited" },
          { name: "AI Data Tables Fetch", value: "Unlimited" },
          { name: "Product Price Simulations", value: "Unlimited" },
          { name: "Free Consulting Hours", value: "On Demand" },
        ],
      },
    ],
  },
  INR: {
    yearly: [
      {
        title: "DIY Plan",
        price: 2300,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per year", value: "240" },
          { name: "Product Price Simulations per year", value: "60" },
          { name: "Free Consulting Hours", value: "NIL" },
        ],
      },
      {
        title: "Startup Plan",
        price: 4700,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per year", value: "240" },
          { name: "Product Price Simulations per year", value: "60" },
          { name: "Free Consulting Hours per year", value: "12" },
        ],
      },
      {
        title: "Scaleup Plan",
        price: 13900,
        period: "Per Month (Billed Yearly)",
        features: [
          { name: "Products", value: "25" },
          { name: "Geo per Product", value: "25" },
          { name: "Industries per Product", value: "25" },
          { name: "AI Data Tables Fetch per year", value: "1200" },
          { name: "Product Price Simulations per year", value: "250" },
          { name: "Free Consulting Hours per year", value: "24" },
        ],
      },
      {
        title: "Enterprise Plan",
        price: "ON REQUEST",
        period: "",
        features: [
          { name: "Products", value: "Unlimited" },
          { name: "Geo per Product", value: "Unlimited" },
          { name: "Industries per Product", value: "Unlimited" },
          { name: "AI Data Tables Fetch", value: "Unlimited" },
          { name: "Product Price Simulations", value: "Unlimited" },
          { name: "Free Consulting Hours", value: "On Demand" },
        ],
      },
    ],
    monthly: [
      {
        title: "DIY Plan",
        price: 3900,
        period: "Per Month",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per month", value: "20" },
          { name: "Product Price Simulations per month", value: "5" },
          { name: "Free Consulting Hours", value: "NIL" },
        ],
      },
      {
        title: "Startup Plan",
        price: 7900,
        period: "Per Month",
        features: [
          { name: "Products", value: "10" },
          { name: "Geo per Product", value: "10" },
          { name: "Industries per Product", value: "10" },
          { name: "AI Data Tables Fetch per month", value: "20" },
          { name: "Product Price Simulations per month", value: "5" },
          { name: "Free Consulting Hours per month", value: "1" },
        ],
      },
      {
        title: "Scaleup Plan",
        price: 23900,
        period: "Per Month",
        features: [
          { name: "Products", value: "25" },
          { name: "Geo per Product", value: "25" },
          { name: "Industries per Product", value: "25" },
          { name: "AI Data Tables Fetch per month", value: "100" },
          { name: "Product Price Simulations per month", value: "20" },
          { name: "Free Consulting Hours per month", value: "2" },
        ],
      },
      {
        title: "Enterprise Plan",
        price: "ON REQUEST",
        period: "",
        features: [
          { name: "Products", value: "Unlimited" },
          { name: "Geo per Product", value: "Unlimited" },
          { name: "Industries per Product", value: "Unlimited" },
          { name: "AI Data Tables Fetch", value: "Unlimited" },
          { name: "Product Price Simulations", value: "Unlimited" },
          { name: "Free Consulting Hours", value: "On Demand" },
        ],
      },
    ],
  },
};

const PricingPage = () => {
  const [currency, setCurrency] = useState("USD");
  const [billingPeriod, setBillingPeriod] = useState("yearly");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safe user data parsing
  const getUserData = () => {
    try {
      const storedUser = localStorage.getItem("user-xcalibure");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.warn("Failed to parse user data from localStorage:", error);
      return null;
    }
  };

  const user = getUserData();

  // Safe Mixpanel tracking function
  const trackMixpanelEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
    if (!isMixpanelInitialized || typeof mixpanel === 'undefined' || !mixpanel) {
      console.warn("Mixpanel is not available or not initialized, skipping tracking for:", eventName);
      return;
    }
    if (typeof mixpanel.track !== 'function') {
      console.error("mixpanel.track is not a function");
      return;
    }
    try {
      mixpanel.track(eventName, properties);
      console.log(`Mixpanel event tracked successfully: ${eventName}`);
    } catch (error) {
      console.error(`Mixpanel tracking error for event "${eventName}":`, error);
    }
  };

  const handleGetStarted = () => {
    try {
      trackMixpanelEvent("Bottom Try for free Clicked", {
        timestamp: new Date().toISOString(),
      });
      if (user) {
        navigate("/getStarted");
      } else {
        dispatch(setAuthScreen("signup"));
        navigate("/auth");
      }
    } catch (error) {
      console.error("Error in handleGetStarted:", error);
      try {
        if (user) {
          navigate("/getStarted");
        } else {
          dispatch(setAuthScreen("signup"));
          navigate("/auth");
        }
      } catch (navError) {
        console.error("Navigation error:", navError);
      }
    }
  };

  // Get plans for current currency and billing period
  // const pricingPlans = pricingPlansData[currency][billingPeriod];
  const pricingPlans = pricingPlansData[currency as "USD" | "INR"][billingPeriod as "yearly" | "monthly"];

  return (
    <div className="w-[95%] mx-auto py-3">
      <PricingHeader />
      <div className="flex flex-wrap justify-center mt-6 items-center gap-6 md:gap-10">
        {/* Yearly/Monthly Toggle with 40% OFF badge */}
        <div className="relative flex items-center">
          {/* Discount badge with arrow */}
          <div className="absolute -top-6 left-2 flex flex-col items-center z-10">
            <span className="bg-[#6C63FF] text-white text-xs font-bold rounded-full px-2 py-0.5 mb-0.5 shadow">40% OFF</span>
            <svg width="24" height="12" viewBox="0 0 24 12" className="-mt-1" style={{ display: 'block' }}>
              <path d="M12 12 L0 0 H24 Z" fill="#6C63FF" />
            </svg>
          </div>
          <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
            <button
              className={`px-4 py-1 text-sm font-semibold focus:outline-none transition-colors duration-200 ${billingPeriod === 'yearly' ? 'bg-[#F3F2FF] text-[#6C63FF]' : 'text-gray-500'}`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
            </button>
            <button
              className={`px-4 py-1 text-sm font-semibold focus:outline-none transition-colors duration-200 ${billingPeriod === 'monthly' ? 'bg-[#F3F2FF] text-[#6C63FF]' : 'text-gray-500'}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
        {/* Currency Dropdown */}
        <div className="flex items-center relative">
          <label className="block text-sm font-normal text-white mr-2">Select Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="appearance-none text-black bg-white border border-gray-300 rounded-md px-3 pr-6 text-sm w-20 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
          {/* Down arrow icon */}
          <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            plan={plan}
            billingPeriod={billingPeriod}
            currency={plan.price !== "ON REQUEST" ? (currency === 'INR' ? '₹' : '$') : ''}
            scrollToRegistration={() => {}}
          />
        ))}
      </div>
      <div className="flex mt-6 justify-center flex-col items-center gap-2">
        <Button
          variant="primary"
          size="lg"
          onClick={handleGetStarted}
          className="w-[280px] text-white"
        >
          Try for free
        </Button>
        <span className="text-white text-sm font-sans italic">No Credit Card Required</span>
      </div>
      {/* <div className='text-white text-sm ml-8 mt-2'><span className="text-white">* </span>
         The subscription limits listed above are annual limits</div> */}
      <div className="mt-6 flex justify-center">
        <ConsultingPricing />
      </div>

    </div>
  );
};

export default PricingPage;