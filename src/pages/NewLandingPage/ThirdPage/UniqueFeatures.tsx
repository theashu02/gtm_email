import React, { useEffect, useRef } from 'react';
import FeatureCard from "./FeatureCard";
import first from "../../../assets/icons/1.png";
import second from "../../../assets/icons/2.png";
import third from "../../../assets/icons/3.png";
import fourth from "../../../assets/icons/4.png";
import fifth from "../../../assets/icons/5.png";
import six from "../../../assets/icons/6.png";
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

const UniqueFeatures = () => {
  const features = [
    {
      title: "HIGH QUALITY DATA FROM TRUSTED SOURCES",
      icon: first,
    },
    {
      title: "ROBUST DATA PRIVACY FRAMEWORK",
      icon: second,
    },
    {
      title: "HUMAN IN LOOP TO PROVIDE VALIDATION AND EXPERT REVIEWS",
      icon: third,
    },
    {
      title: "ROBUST CONSULTING FRAMEWORKS FOR SCIENTIFIC DECISION-MAKING",
      icon: fourth,
    },
    {
      title: "80% REDUCTION IN COST AND TIME REQUIRED FOR PLANNING",
      icon: fifth,
    },
    {
      title: "REAL-TIME MONITORING AGAINST THE PLAN",
      icon: six,
    },
  ];

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
        
        console.log("Time spent on GTM Vantage Specification page:", timeSpentSeconds, "seconds");
        
        // Track the event with safe error handling
        trackMixpanelEvent("User on GTM Vantage Specification-Home", {
          isLoggedIn: !!user,
          timeSpentSeconds,
          featuresCount: features.length,
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
  }, [user, features.length]);

  return (
    <section className="bg-[#FFFFFF] py-16">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[#000000] md:text-4xl">
          WHAT MAKES GTM VANTAGE UNIQUE
        </h2>
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3 md:mx-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueFeatures;