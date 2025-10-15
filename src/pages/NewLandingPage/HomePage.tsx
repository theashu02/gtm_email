import { useRef } from "react";
import WhyWeChoose from "@/pages/NewLandingPage/pricingPage/WhyWeChoose";
import { easeOut, motion, useScroll } from "framer-motion";
import FourthLandingPage from "./FourthPage/FourthLandingPage";
import ThirdHomePage from "./ThirdPage/ThirdHomePage";
import SecondHomePage from "./SecondPage/SecondHomePage";
import MainPagePricing from "./pricingPage/MainPage";
import Footer from "./BottomPage/Footer";
import FirstHomePage from "./FirstPage/FirstHomePage";
import FAQ from "./BottomPage/FAQ";
import RegisterForm from "./BottomPage/RegisterForm";

export default function HomePage() {
  const registerFormRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Minimal animation variants
  const sectionVariants = {
    hidden: { opacity: 0.8, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <div className="h-full overflow-y-auto overflow-x-hidden">
        <FirstHomePage />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <SecondHomePage />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <ThirdHomePage />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <FourthLandingPage />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <WhyWeChoose />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <MainPagePricing />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <FAQ />
        </motion.div>

        <div ref={registerFormRef}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={sectionVariants}
          >
            <RegisterForm />
          </motion.div>
        </div>

        <div className="w-full h-[0.5px] bg-slate-600"></div>
        <Footer />
      </div>
    </>
  );
}
