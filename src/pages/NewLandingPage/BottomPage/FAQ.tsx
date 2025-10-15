import { useState } from "react";
import { Plus  } from "lucide-react";
import bgimage from "@/assets/faq.png"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = [
    {
      question: "What is GTMVantage, and how can it help my business?",
      answer:
        "GTMVantage is an end-to-end Go-To-Market (GTM) platform that helps businesses plan, execute, and optimize their GTM strategy. It covers everything from GTM planning and demand generation to product pricing simulation and execution using third-party tools. With real-time performance monitoring, it ensures data-driven decisions for better market success.",
    },
    {
      question: "How does GTMVantage support demand generation?",
      answer:
        "GTMVantage enables demand generation by providing a structured planning framework, seamless integration with third-party tools for execution, and real-time monitoring to track campaign effectiveness. It ensures optimized targeting, improved lead generation, and higher ROI by aligning marketing and sales efforts.",
    },
    {
      question: "Can GTMVantage help with product pricing decisions?",
      answer:
        "Yes, GTMVantage includes a pricing simulation feature that analyzes multiple factors to recommend optimal pricing strategies. It models costs, revenues, and profitability scenarios, ensuring pricing aligns with business goals while maintaining competitiveness and maximizing margins.",
    },
    {
      question:
        "Does GTMVantage integrate with existing marketing and sales tools?",
      answer:
        "Absolutely! GTMVantage is designed to work seamlessly with third-party demand generation and CRM tools, allowing businesses to execute campaigns efficiently while maintaining a centralized view of all GTM activities.",
    },
    {
      question: "How can I track the effectiveness of my GTM strategy?",
      answer:
        "GTMVantage provides real-time monitoring dashboards that track key performance indicators (KPIs), compare planned vs. actual performance, and offer data-driven insights. This allows businesses to make agile adjustments, optimize strategies, and drive continuous growth.",
    },
  ];

  return (
    <div
      className="min-h-8xl py-12 px-4 font-poppins max-w-screen"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-screen mx-[6%]">
        <h2 className="text-black text-3xl text-center mb-8 font-bold text-[56px] leading-[100%] tracking-[0%] uppercase">
          FAQ
        </h2>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-[#FFFFFF] rounded-xl px-6 py-4 pr-12 hover:bg-gray-50 transition-colors flex items-center justify-between font-medium text-[24px] leading-[100%] tracking-[0%]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                {item.question}
                <Plus
                  className={`absolute text-[#00000099] right-4 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                />
              </button>

              {openIndex === index && item.answer && (
                <div className="mt-1 rounded-xl px-6 py-4 shadow-lg">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
