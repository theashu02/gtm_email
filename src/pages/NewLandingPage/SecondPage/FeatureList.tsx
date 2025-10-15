import { useDispatch, useSelector } from "react-redux";
import { toggleFeature } from "../../../store/slices/LandingPage/featureSlice";
import FeatureItem from "./FeatureItem";
import first from "../../../assets/productinfo/1.png";
import second from "../../../assets/productinfo/2.png";
import third from "../../../assets/productinfo/3.png";
import four from "../../../assets/productinfo/4.png";
import five from "../../../assets/productinfo/5.png";
import six from "../../../assets/productinfo/6.png";
import seven from "../../../assets/productinfo/7.png";
import { useEffect, useRef } from "react";
import type { RootState } from "@/store/store";

const features = [
  {
    id: 1,
    title: "AI-Driven Competitive Intelligence",
    description:
      "Gain a strategic edge with advanced competitor analysis. Benchmark your rivals across key dimensions like brand, cost, reliability, and scalability. Discover their strengths and weaknesses to refine your positioning and strategy.",
    image: first,
  },
  {
    id: 2,
    title: "Identify Attractive Markets for Your Products",
    description: (
      <>
        Evaluate geographies, industries, and customer segments on market
        potential, risk, and growth.
        <br /> Prioritize high-value markets with clear, data-backed insights
        for effective go-to-market decisions.
      </>
    ),
    image: second,
  },
  {
    id: 3,
    title: "AI-Powered Customer Preferences Analysis",
    description:
      "Leverage the Customer Value Map to understand customer preferences across segments and regions. Align your product and messaging to meet expectations and target the most relevant customer groups.",
    image: third,
  },
  {
    id: 4,
    title: (
      <>
        Get a Compelling Value Proposition and ICP for
        <br />
        your product
      </>
    ),
    description:
      "Define a sharp value proposition and ideal customer profile (ICP) using insights from geography, product features, and customer needs. Enable personalized messaging, boost conversions, and improve go-to-market ROI.",
    image: seven,
  },
  {
    id: 5,
    title: "Goal-Based Pricing and Full P&L Simulation",
    description:
      "Set smart, goal-aligned pricing by considering geography, revenue targets, costs, customer segments, and competitor pricing. Simulate full P&L outcomes to make confident, data-driven pricing decisions.",
    image: five,
  },
  {
    id: 6,
    title: "AI-Powered Comprehensive Demand Generation Planning",
    description:
      "Plan high-impact demand generation with AI-recommended channels, tailored tactics, and channel ROI analysis. Maximize your marketing efficiency and investment returns with continuous performance tracking.",
    image: six,
  },
  {
    id: 7,
    title: (
      <>
        Real-Time KPI Monitoring & <br /> Planned vs. Actual Performance
      </>
    ),
    description:
      "GTM Vantage Integrates seamlessly with your CRM and campaign tools. Monitor real-time KPIs across geographies, products, and channels. Track planned vs. actual performance, and identify gaps to maximize outcome.",
    image: four,
  },
];

function FeatureList() {
  const dispatch = useDispatch();
  const openId = useSelector((state: RootState) => state.feature.openId);

  const storedUser = localStorage.getItem("user-xcalibure");
  const startTimeRef = useRef(Date.now());
  const user = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
    const handleUnload = () => {
      const timeSpentMs = Date.now() - startTimeRef.current;
      const timeSpentSeconds = Math.round(timeSpentMs / 1000);
      console.log(timeSpentSeconds);
    };

    // Listen for page unload or component unmount
    window.addEventListener("beforeunload", handleUnload);

    // React cleanup on unmount
    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="space-y-4 md:space-y-6 font-light text-[17.31px] leading-[100%] tracking-[0%] text-[#8A8A8A]">
        {features.map((feature) => (
          <FeatureItem
            key={feature.id}
            title={feature.title}
            description={feature.description}
            isOpen={openId === feature.id}
            onClick={() =>
              dispatch(toggleFeature({ id: feature.id, image: feature.image }))
            }
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureList;
