import PropTypes from 'prop-types';

function SectionHeading({ title }) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#FFFFFF] leading-[100%] tracking-[0%]">
      {title}
    </h1>
  );
}

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeading;
