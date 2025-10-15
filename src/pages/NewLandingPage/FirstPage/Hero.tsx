import { useEffect, useRef } from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

// Utility functions to extract attribution data
const getQueryParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || '';
};

const getAttributionData = () => {
  return {
    utm_source: getQueryParam('utm_source'),
    utm_medium: getQueryParam('utm_medium'),
    utm_campaign: getQueryParam('utm_campaign'),
    utm_term: getQueryParam('utm_term'),
    utm_content: getQueryParam('utm_content'),
    referrer: document.referrer,
    landing_page: window.location.href,
  };
};

// Safe Mixpanel initialization
const initializeMixpanel = () => {
  try {
    if (import.meta.env.VITE_MIXPANEL_TOKEN && typeof mixpanel !== 'undefined') {
      mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: true });
      console.log("Mixpanel initialized successfully");

      // Register attribution data as super properties
      const attributionData = getAttributionData();
      mixpanel.register(attributionData);
      console.log("Attribution data registered in Mixpanel:", attributionData);
      
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

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startTimeRef = useRef(Date.now());

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

  useEffect(() => {
    const handleUnload = () => {
      try {
        const timeSpentMs = Date.now() - startTimeRef.current;
        const timeSpentSeconds = Math.round(timeSpentMs / 1000);
        trackMixpanelEvent("User on Home Page", {
          isLoggedIn: !!user,
          timeSpentSeconds,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error in handleUnload:", error);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      try {
        handleUnload();
        window.removeEventListener("beforeunload", handleUnload);
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, [user]);

  const handleGetStarted = () => {
    try {
      trackMixpanelEvent("Top Try for free Clicked", {
        isLoggedIn: !!user,
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

  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center text-white">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-5xl mx-auto text-center md:mt-24">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold mb-8 text-[#131A29] text-center font-poppins">
              <span>World&apos;s Most Advanced Go-To-Market</span><br />
              <span className="block mt-6">Strategy Platform</span>
            </h1>
            <p className="text-xl md:text-3xl italic mb-8 font-bold"
              style={{ background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Artificial Intelligence, Human Wisdom
            </p>
            <p className="text-base md:text-lg mb-12 max-w-5xl mx-auto text-[#131A29] font-normal text-[18px] text-center font-poppins">
              A GTM platform that blends Artificial Intelligence and human expertise, cutting costs, time, and effort in GTM planning by 80%, while enabling real-time monitoring to boost the efficiency and effectiveness of your GTM strategy.
            </p>

            <div className="mt-16 flex flex-col items-center gap-2">
              <Button variant="primary" size="lg" className="animate-pulse w-52 h-12 text-xl" onClick={handleGetStarted}>
                Try for free
              </Button>
              <span className="text-black text-sm font-sans italic">No Credit Card Required</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
