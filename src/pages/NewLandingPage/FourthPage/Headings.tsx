import ConsultantTeam from "./ConsultantTeam";
import LogoCarousel from "./LogoCarousel";
import SecondLogoCarousel from "./SecondLogoCarousel";

const BlackStrip = () => {
  return (
    <div className="w-full flex justify-center items-center bg-[#000000] h-28 md:h-32 lg:h-32"></div>
  );
}

export default function Headings() {
  return (
    <>
      <div className="w-full flex justify-center items-center bg-[#000000] py-12">
        <h1 className="font-bold text-2xl md:text-[50px] px-1 leading-[100%] tracking-[0%] text-[#FFFFFF] text-center uppercase">
          Trusted Data Sources
        </h1>
      </div>
      <LogoCarousel />
      <BlackStrip />
      <ConsultantTeam />
      <div className="w-full flex justify-center items-center bg-[#000000] py-12">
        <h1 className="font-bold text-2xl md:text-[50px] px-1 leading-[100%] tracking-[0%] text-[#FFFFFF] text-center uppercase">
          Trusted by 200+ customers
        </h1>
      </div>
      <SecondLogoCarousel />
      <BlackStrip />
    </>
  );
}
