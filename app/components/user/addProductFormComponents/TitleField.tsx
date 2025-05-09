import React from "react";

interface TitleFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TitleField: React.FC<TitleFieldProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block text-[12px] font-bold text-white mb-2">Title</label>
      <input
        type="text"
        placeholder="Product Name"
        value={value}
        onChange={onChange}
        className="mt-1 block bg-[#111827] w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
};

export default TitleField;
