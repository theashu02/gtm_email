type FeatureItemProps = {
  name: string;
  value: string | number;
};

const FeatureItem = ({ name, value }: FeatureItemProps) => {
  // console.log("FeatureItem rendered with name:", name, "and value:", value);
  const isConsultingHours = name === "Free Consulting Hours";
  return (
    <div className="flex justify-between">
      <span className={`leading-[150%] tracking-[0%] capitalizefont-medium text-[15px]  ${isConsultingHours ? "font-bold" : "font-medium"}`}>
        {name}
      </span>
      <span className={`text-right text-[15px] leading-[150%] tracking-[0%] capitalize ${isConsultingHours ? "font-bold" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
};

export default FeatureItem;
