import { LucideIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

interface Props {
  name: string;
  className?: string;
  placeholder?: string;
  items: SelectItem[];
}

export const CustomSelect: React.FC<Props> = ({ name, placeholder, items }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select onValueChange={onChange} defaultValue={value}>
          <SelectTrigger className="w-full py-2 border">
            <SelectValue placeholder={placeholder ?? "Choose a value"} />
          </SelectTrigger>
          <SelectContent>
            {items.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};
