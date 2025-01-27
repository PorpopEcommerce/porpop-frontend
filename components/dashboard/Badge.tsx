type BadgeProps = {
  variant: "lowStock" | "published" | "delivered" | "draft" | "unpublished";
  text?: string;
};

export default function Badge({ variant, text }: BadgeProps) {
  const baseClasses = "shrink-0 px-3 py-1 rounded-lg text-sm font-medium";
  const variantClasses = {
    lowStock: "bg-orange-50 text-orange-500",
    published: "bg-green-50 text-green-600",
    delivered: "bg-green-50 text-green-600",
    draft: "bg-neutral-50 text-neutral-500",
    unpublished: "bg-red-50 text-red-500",
  };

  const label = {
    lowStock: "Low Stock",
    published: "Published",
    delivered: "Delivered",
    draft: "Draft",
    unpublished: "Unpublished",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {text || label[variant]}
    </span>
  );
}
