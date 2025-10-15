

import PropTypes from "prop-types";

const PercentageIcon = ({ percentage, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-4xl font-bold">{percentage}</span>
    </div>
  );

}

PercentageIcon.propTypes = {
  percentage: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default PercentageIcon;
