import { ReactNode } from "react";

export default function Section({
  children,
  noPaddingX = false,
}: {
  children: ReactNode;
  noPaddingX?: boolean;
}) {
  return (
    <section
      className={`bg-dark-600 rounded-lg shadow-[0px 4px 30px 0px rgba(85, 85, 85, 0.05)] text-grey-200 text-sm overflow-hidden py-4 ${
        !noPaddingX && "px-4"
      }`}
    >
      {children}
    </section>
  );
}
