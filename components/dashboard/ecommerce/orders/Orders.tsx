import Button from "@/components/Button";
import Order from "./Order";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export default function Orders() {
  return (
    <section className="text-grey-200 text-sm pb-3 space-y-6">
      <Order />
      <Order />
      <Order />
      <Order />

      <div className="flex flex-wrap gap-4 items-center justify-between mt-3 px-3">
        <p className="text-grey-300">Showing 1-10 from 100</p>

        <div className="flex items-center gap-2">
          <Button variant="secondary" icon={<FaCaretLeft />} />
          <Button variant="secondary">1</Button>
          <Button variant="secondary">2</Button>
          <Button variant="secondary">...</Button>
          <Button variant="secondary" icon={<FaCaretRight />} />
        </div>
      </div>
    </section>
  );
}
