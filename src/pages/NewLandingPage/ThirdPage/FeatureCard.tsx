import PropTypes from "prop-types";

const FeatureCard = ({ title, icon, className = "" }) => {
  return (
    <div
      className={`overflow-hidden rounded-3xl border transition-all hover:shadow-md shadow-lg w-[100%] h-[350px] flex flex-col ${className}`}
    >
      {/* Icon section - 50% height */}
      <div
        className="flex items-center justify-center bg-[#363636] p-3"
        style={{ flex: "1 0 50%" }}
      >
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={title}
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 text-white">{icon}</div>
        )}
      </div>

      {/* Title section - 50% height */}
      <div
        className="bg-[#FFFFFF] py-12 px-6 sm:p-5 md:p-6 flex"
        style={{ flex: "1 0 50%" }}
      >
        <h3 className="text-[#0F1521] font-bold text-base sm:text-lg md:text-xl leading-tight uppercase">
          {title}
        </h3>
      </div>
    </div>
  );
}


FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

export default FeatureCard;
