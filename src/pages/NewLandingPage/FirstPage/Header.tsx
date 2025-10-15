import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoimg from "../../../assets/GTMVantageLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthScreen } from "../../../store/slices/userSlice";
import mixpanel from "mixpanel-browser";

// Safe Mixpanel initialization with error handling
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

// Initialize Mixpanel
const isMixpanelInitialized = initializeMixpanel();

// Safe Mixpanel tracking function
const trackEvent = (eventName, properties = {}) => {
  try {
    if (isMixpanelInitialized && mixpanel && typeof mixpanel.track === 'function') {
      mixpanel.track(eventName, properties);
    } else {
      console.warn("Mixpanel not available, skipping event:", eventName);
    }
  } catch (error) {
    console.error("Error tracking Mixpanel event:", error);
  }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Safe localStorage access
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user-xcalibure");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  };
  
  const user = getUserFromStorage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gtag_report_conversion = (url) => {
    const callback = function () {
      if (typeof url !== 'undefined') {
        window.location = url;
      }
    };
    
    try {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17033919993/GBo5CKvrx8gaEPn7s7o_',
          event_callback: callback,
        });
      }
    } catch (error) {
      console.error("Error with gtag conversion:", error);
    }
    
    return false;
  };

  const handleClick = () => {
    // Safe Mixpanel tracking
    trackEvent("Login Button Clicked on Home Page", {
      timestamp: new Date().toISOString(),
    });
    
    gtag_report_conversion();
    
    if (user) {
      navigate("/getStarted");
    } else {
      dispatch(setAuthScreen("login"));
      navigate("/auth");
    }
  };

  const handleSignUpClick = () => {
    // Safe Mixpanel tracking
    trackEvent("Sign up for free Clicked", {
      isLoggedIn: !!user,
      timestamp: new Date().toISOString(),
    });
    
    if (user) {
      navigate("/getStarted");
    } else {
      dispatch(setAuthScreen("signup"));
      navigate("/auth");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:px-6 ${
        isScrolled ? "bg-[#000000] shadow-md py-0" : "bg-[#000000] py-0"
      }`}
    >
      <div className="container mx-auto px-1 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={logoimg}
              alt="Footer Logo"
              className="h-[70px] w-auto object-contain mt-2"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className={`px-6 py-2 rounded-full transition duration-300 bg-[#FFFFFF] ${
              isScrolled
                ? "text-gray-800 hover:text-gray-900"
                : "text-gray-800 hover:text-gray-900"
            }`}
            onClick={handleSignUpClick}
          >
            Sign up for free
          </button>
          <button
            className="px-6 py-2 text-white rounded-full transition duration-300 hover:shadow-lg"
            style={{
              background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
            }}
            onClick={handleClick}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-md ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="text-gray-200" size={24} />
            ) : (
              <Menu className="text-gray-200" size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#000000] shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              className="w-full py-2 text-center transition duration-300 bg-[#FFFFFF] rounded-3xl hover:bg-slate-200"
              onClick={handleSignUpClick}
            >
              Sign up for free
            </button>
            <button
              className="w-full py-2 text-white rounded-md transition duration-300"
              style={{
                background:
                  "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
              }}
              onClick={handleClick}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;