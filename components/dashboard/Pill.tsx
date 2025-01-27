export default function Pill({ value }: { value: string }) {
  return (
    <div className="text-[8px] text-white bg-cyan-500 py-[2px] px-1.5 rounded">
      {value}
    </div>
  );
}
