type PercentageIconProps = {
  percentage: number | string;
  className?: string;
};

const PercentageIcon = ({ percentage, className = "" }: PercentageIconProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-4xl font-bold">{percentage}</span>
    </div>
  );
}

export default PercentageIcon;
