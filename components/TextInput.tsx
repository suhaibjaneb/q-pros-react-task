import { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  type = "text",
}: TextInputProps) {
  return (
    <label className="input-group w-fit min-w-[30%] m-4">
      <span className="bg-emerald-950 w-[35%]">{label}</span>
      <input
        type={type}
        name={label.toLowerCase()}
        onChange={onChange}
        placeholder={`enter your ${label}`}
        value={value}
        className="input input-bordered bg-emerald-100 text-black	w-[65%]"
      />
    </label>
  );
}
