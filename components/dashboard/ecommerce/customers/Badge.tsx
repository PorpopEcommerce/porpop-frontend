type BadgeProps = {
  variant: "active" | "blocked";
};

export default function Badge({ variant }: BadgeProps) {
  const baseClasses = "px-3 py-1 rounded-lg text-sm font-medium";
  const variantClasses = {
    active: "bg-green-50 text-green-600",
    blocked: "bg-red-50 text-red-500",
  };

  const label = {
    active: "Active",
    blocked: "Blocked",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {label[variant]}
    </span>
  );
}
