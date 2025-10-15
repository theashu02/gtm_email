import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import FeatureList from './FeatureList';
import ProductImage from './ProductImage';
import SectionHeading from './SectionHeading';
import first from '../../../assets/productinfo/1.png';
import mixpanel from "mixpanel-browser";
import type { RootState } from '@/store/store';

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

function ProductDetailsSection() {
  const selectedImage = useSelector((state: RootState) => state.feature.selectedImage || first);

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
  const trackMixpanelEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
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
        
        console.log("Time spent on Product Details page:", timeSpentSeconds, "seconds");
        
        // Track the event with safe error handling
        trackMixpanelEvent("User on Product Detail Page", {
          isLoggedIn: !!user,
          timeSpentSeconds,
          selectedImage: selectedImage,
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
  }, [user, selectedImage]);

  return (
    <section className="w-full bg-[#000000] text-[#FFFFFF] px-4 md:px-8 lg:px-16 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="PRODUCT DETAILS" />
        
        <div className="mt-8 md:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-5/12 space-y-6">
            <FeatureList />
          </div>
          
          <div className="w-full lg:w-7/12 flex justify-center items-center">
            <ProductImage image={selectedImage} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsSection;