import { useEffect, useRef } from 'react';
import ConsultantCard from "./ConsultantCard";
import first from "@/assets/peoples/1.png";
import second from "@/assets/peoples/2.png";
import third from "@/assets/peoples/3.png";
import four from "@/assets/peoples/4.png";
import five from "@/assets/peoples/5.png";
import six from "@/assets/peoples/6.png";
import seven from "@/assets/peoples/7.png";
import eight from "@/assets/peoples/8.png"
import NVIDIA from "@/assets/company/14.png";
import Amazon from "@/assets/company/3.png";
import Nokia from "@/assets/company/9.png";
import Conviva from "@/assets/company/5.png";
import SAP from "@/assets/company/8.png";
import Microsoft from "@/assets/company/7.png";
import Uipath from "@/assets/company/12.png";
import Canon from "@/assets/company/11.png";
import Huwaei from "@/assets/company/6.png";
import Motorola from "@/assets/company/4.png";
import GE from "@/assets/company/10.png";
import Google from "@/assets/company/13.png";
import FIN from "@/assets/company/15.png";
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

const teamMembers = [
  {
    id: "1",
    name: "NEERAJ SAXENA",
    image: first,
    country: {
      name: "IND",
      code: "in",
    },
    companies: [
      SAP,
      FIN,
    ],
  },
  {
    id: "2",
    name: "ABHISHEK VATSA",
    image: second,
    country: {
      name: "CANADA",
      code: "ca",
    },
    companies: [
      Amazon,
      Motorola,
    ],
  },
  {
    id: "3",
    name: "SUSHANT SHARMA",
    image: third,
    country: {
      name: "SINGAPORE",
      code: "sg",
    },
    companies: [
     Conviva,
      Huwaei,
    ],
  },
  {
    id: "4",
    name: "SANDEEP NAGPAL",
    image: four,
    country: {
      name: "INDIA",
      code: "in",
    },
    companies: [
      Microsoft,
      SAP,
    ],
  },
  {
    id: "5",
    name: "ASHUTOSH PANDEY",
    image: five,
    country: {
      name: "UNITED KINGDOM",
      code: "gb",
    },
    companies: [
      Nokia,
      GE,
    ],
  },
  {
    id: "6",
    name: "VINEET KUMAR",
    image: six,
    country: {
      name: "SINGAPORE",
      code: "sg",
    },
    companies: [
     SAP,
      Canon,
    ],
  },
  {
    id: "7",
    name: "RAJESH KUMAR",
    image: seven,
    country: {
      name: "INDIA",
      code: "in",
    },
    companies: [
      Microsoft,
      Uipath,
    ],
  },
  {
    id: "8",
    name: "VARINDER PAUL",
    image: eight,
    country: {
      name: "USA",
      code: "us",
    },
    companies: [
      Google,
      NVIDIA,
    ],
  },
];

const ConsultantTeam = () => {
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
        
        console.log("Time spent on Consultant Team page:", timeSpentSeconds, "seconds");
        
        // Track the event with safe error handling
        trackMixpanelEvent("User on Consultant Team Page-Home", {
          isLoggedIn: !!user,
          timeSpentSeconds,
          consultantsCount: teamMembers.length,
          consultantsDisplayed: teamMembers.map(member => ({
            name: member.name,
            country: member.country.name
          })),
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
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6 font-bold leading-[100%] tracking-[0%] uppercase text-black">
            Team of top industry consultants
          </h1>
          <p className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed">
            <span className="font-extrabold text-[36px] leading-[100%] tracking-[0%] text-center">
              40+ Global Consultants
            </span>{" "}
            <span className="font-medium text-[36px] leading-[100%] tracking-[0%] text-center">
              each having atleast
            </span>{" "}
            <span className="font-bold text-[36px] leading-[100%] tracking-[0%] text-center">
              20+ Years
            </span>{" "}
            <span className="font-medium text-[36px] leading-[100%] tracking-[0%] text-center">
              of experience in respective GTM Areas
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {consultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))} */}
          {teamMembers.map((member) => (
            <div key={member.id} className="h-full">
              <ConsultantCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantTeam;