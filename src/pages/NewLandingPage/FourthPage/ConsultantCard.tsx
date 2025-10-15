import PropTypes from "prop-types";

const ConsultantCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] h-full">
      <div className="aspect-square overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-col items-center justify-center">
          <h3 className="text-black text-lg font-bold text-[20px] leading-[150%] tracking-[0%] text-center uppercase font-poppins">
            {member.name}
          </h3>

          <div className="flex items-center mt-1">
            <img
              src={`https://flagcdn.com/${member.country.code.toLowerCase()}.svg`}
              alt={member.country.name}
              className="w-6 h-4 mr-2"
            />
            <span className="text-black font-normal text-sm">{member.country.name}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 mt-2">
          <div className="flex flex-wrap gap-3 justify-between items-center px-3">
            {member.companies.map((company, index) => (
              <div key={index} className="h-16 flex items-center">
                <img
                  src={company}
                  alt="Company logo"
                  className="max-h-full max-w-[80px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ConsultantCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    country: PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
    companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ConsultantCard;
