import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

function FeatureItem({ title, description, isOpen, onClick }) {
  return (
    <div className="p-[0.87px] rounded-lg bg-gradient-to-b from-[#09D2F8] to-[#5735BA]">
      <div
        className="py-1 p-3 rounded-lg bg-black opacity-90 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <p className="text-white text-sm md:text-lg font-medium">{title}</p>
          <ChevronDown
            className={`h-5 w-5 text-white transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && (
          <p className="text-gray-100 text-sm md:text-base mt-2 mb-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

FeatureItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  description: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FeatureItem;
