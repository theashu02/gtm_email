type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
};

const Button = ({
  children,
  onClick,
  className = "",
  size = "md",
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300";
    
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-2 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={{
        background: "linear-gradient(180deg, #09D2F8 0%, #5735BA 87.5%)",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
