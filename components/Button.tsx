import { ReactNode } from "react";

type ButtonProps = {
  children?: string;
  icon?: ReactNode;
  variant?: "green" | "secondary" | "dark";
  className?: string;
  pos?: "center";
};

export default function Button({
  children = "",
  icon,
  variant = "green",
  className = "",
  pos,
}: ButtonProps) {
  const baseClasses = `flex items-center shrink-0 ${
    pos === "center" && "justify-center"
  } gap-2 px-4 py-2 rounded-lg font-medium transition-colors border text-sm`;
  const variantClasses =
    variant === "green"
      ? "bg-primary-700 text-white border-transparent hover:opacity-80"
      : variant === "secondary"
      ? "bg-primary-50 text-primary-700 border-transparent hover:opacity-80"
      : "bg-dark-600 text-grey-200 border-dark-400 hover:opacity-80";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}
