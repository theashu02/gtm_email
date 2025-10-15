type Section = {
  title: string;
};

function SectionHeading({ title }: Section) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#FFFFFF] leading-[100%] tracking-[0%]">
      {title}
    </h1>
  );
}

export default SectionHeading;
