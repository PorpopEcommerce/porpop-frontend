import Section from "@/components/dashboard/Section";
import { ReactNode } from "react";
import { FaCaretUp, FaMoneyBill, FaTrophy } from "react-icons/fa";
import { TbShoppingCartCheck } from "react-icons/tb";

export default function Overview() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card
        title="Total Orders"
        amount="2,400"
        icon={
          <div className="bg-orange-50 text-orange-500 rounded-lg p-2 text-lg">
            <TbShoppingCartCheck />
          </div>
        }
      />
      <Card
        title="Total Balance"
        amount="$200.00"
        icon={
          <div className="bg-primary-50 text-primary-500 rounded-lg p-2 text-lg">
            <FaMoneyBill />
          </div>
        }
      />
      <Card
        title="Reward Points"
        amount="2,000"
        icon={
          <div className="bg-green-50 text-green-500 rounded-lg p-2 text-lg">
            <FaTrophy />
          </div>
        }
      />
    </div>
  );
}

function Card({
  title,
  icon,
  amount,
}: {
  title: string;
  icon: ReactNode;
  amount: string;
}) {
  return (
    <Section>
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <p className="text-base text-gray-500">{title}</p>
          <h4 className="font-semibold text-white text-xl">{amount}</h4>
        </div>

        <div>{icon}</div>
      </div>

      <p className="flex items-center mt-2 gap-1">
        <span className="text-green-600">2%</span>
        <FaCaretUp className="text-green-600" />
        <span className="text-grey-200">+24 this month</span>
      </p>
    </Section>
  );
}
