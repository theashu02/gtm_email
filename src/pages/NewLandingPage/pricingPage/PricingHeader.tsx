import React, { useEffect, useRef } from 'react';
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

const PricingHeader = () => {
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

  // Use a ref to store start time (won't trigger re-renders)
  const startTimeRef = useRef(Date.now());

  // Safe Mixpanel tracking function
  const trackMixpanelEvent = (eventName, properties = {}) => {
    // Check if Mixpanel is available and initialized
    if (!isMixpanelInitialized || typeof mixpanel === 'undefined' || !mixpanel) {
      console.warn("Mixpanel is not available or not initialized, skipping tracking for:", eventName);
      return;
    }

    // Check if track function exists
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

  // Track time spent when component unmounts or page unloads
  useEffect(() => {
    const handleUnload = () => {
      try {
        const timeSpentMs = Date.now() - startTimeRef.current;
        const timeSpentSeconds = Math.round(timeSpentMs / 1000);
        
        console.log("Time spent on Pricing page:", timeSpentSeconds, "seconds");
        
        // Track the event with safe error handling
        trackMixpanelEvent("User on Pricing Page-Home", {
          isLoggedIn: !!user,
          timeSpentSeconds,
          pageName: "Pricing",
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error in handleUnload:", error);
      }
    };

    // Listen for page unload or component unmount
    window.addEventListener("beforeunload", handleUnload);

    // React cleanup on unmount
    return () => {
      try {
        handleUnload();
        window.removeEventListener("beforeunload", handleUnload);
      } catch (error) {
        console.error("Error in cleanup:", error);
      }
    };
  }, [user]);

  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-white tracking-wider">PRICING</h2>
    </div>
  );
};

export default PricingHeader;