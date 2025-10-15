import { Link } from "react-router-dom";
import { Building2, MapPin, Mail, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#FFFFFF] w-full font-poppins">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="flex gap-8">
          <div className="space-y-3 mt-3">
            <div className="flex items-start">
              <Building2 className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm">GTM Vantage Technologies Pvt. Ltd</p>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm">
                Ground Floor , Plot No. 7 LSC, Pocket 6 & 7, <br /> opposite
                Delhi Public School, New Delhi, Delhi 110070
              </p>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
              <a
                href="mailto:contact@gtmvantage.com"
                className="text-sm hover:text-gray-300 transition-colors"
              >
                contact@gtmvantage.com
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-[90%] mt-3">
            <div>
              <Link to="/contact-us">
                <h3 className="mb-4 font-normal text-[17px] leading-[100%] tracking-[0%] hover:text-gray-300 cursor-pointer">
                  Contact us
                </h3>
              </Link>
            </div>

            <div>
              <Link to="/privacy-policy">
                <h3 className="mb-4 font-normal text-[17px] leading-[100%] tracking-[0%] hover:text-gray-300 cursor-pointer">
                  Privacy policy
                </h3>
              </Link>
            </div>

            <div>
              <Link to="/terms-and-conditions">
                <h3 className="mb-4 font-normal text-[17px] leading-[100%] tracking-[0%] hover:text-gray-300 cursor-pointer">
                  Terms and Conditions
                </h3>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm flex justify-center items-center mt-2">
          <Copyright className="h-6 w-6 mr-1" />
          <p>{new Date().getFullYear()} GTMVantage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;