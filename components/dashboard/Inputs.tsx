import { ReactNode } from "react";

type TextInputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
};

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
};

type SelectProps = {
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: ReactNode;
};

export function TextInput({
  label,
  type = "text",
  placeholder = "",
  icon,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-grey-300">{label}</label>}
      <div className="flex items-center border rounded-lg px-3 py-3 bg-dark-500 border-dark-400">
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent placeholder:text-grey-200"
        />
      </div>
    </div>
  );
}

export function TextArea({ label, placeholder = "", icon }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-grey-300">{label}</label>}
      <div className="flex items-start border rounded px-3 py-3 bg-dark-500 border-dark-400">
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        <textarea
          placeholder={placeholder}
          rows={5}
          className="w-full outline-none bg-transparent resize-none placeholder:text-grey-200"
        />
      </div>
    </div>
  );
}

export function Select({
  label,
  options,
  placeholder = "Select...",
  icon,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-grey-300">{label}</label>}
      <div className="flex items-center border rounded-lg px-3 py-3 bg-dark-500 border-dark-400">
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        <select className="w-full outline-none bg-transparent text-grey-200">
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-dark-500"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
