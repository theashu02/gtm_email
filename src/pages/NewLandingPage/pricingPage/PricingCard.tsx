import BuyNowButton from "./BuyNowButton";
import FeatureItem from "./FeatureItem";
import PropTypes from "prop-types";
import RegisterForm from "../../../components/Home/RegisterForm";

const PricingCard = ({ plan, currency, scrollToRegistration,billingPeriod }) => {
  const handleClick = () => {
  window.scrollBy({
    top: window.innerHeight * 2, // 200vh
    behavior: "smooth",
  });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-[60px] p-8 flex flex-col h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-[22.75px] leading-[100%] tracking-[0%] text-center">
          {plan.title}
        </h3>
        <div className="mt-5">
          {plan.price !== "ON REQUEST" ? (
            <>
              <span className="text-4xl font-bold">{currency}</span>
              <span className="font-bold text-[30px] leading-[60%] tracking-[0%] text-center capitalize">
                {plan.price}<span className="text-[20px] font-normal">/Month</span>
              </span>
             { billingPeriod === "yearly" && 
              <div className="mt-1 font-normal text-[14px] leading-[100%] tracking-[0%] text-center text-black">
                Billed Annually
              </div>
              }
            </>
          ) : (
            <div
              className={`text-xl font-bold mt-4 ${plan.price === "ON REQUEST" ? "mb-5" : ""
                }`}
            >
              {plan.price}
            </div>
          )}
        </div>
      </div>

      {plan.price !== "ON REQUEST" ? (
        <div className="mt-1 text-center mb-4">
          <BuyNowButton />
        </div>
      ) : (
        <div className="mt-1 text-center mb-4">
          <button
            className="bg-black text-white font-bold px-6 py-2 uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors duration-300"
            onClick={handleClick}
          >
            Contact Sales
          </button>
        </div>
      )}

      <div className="border-2 border-[#000000] my-6 mb-7"></div>

      <div className="space-y-1 flex-grow">
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} name={feature.name} value={feature.value} />
        ))}
      </div>
    </div>
  );
};

PricingCard.propTypes = {
  plan: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    period: PropTypes.string,
    features: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  scrollToRegistration: PropTypes.object, // passed ref
};

export default PricingCard;