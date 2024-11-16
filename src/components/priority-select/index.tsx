import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { priorities } from '../tasks-table/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
  className?: string;
  control: any;
}

export const PrioritySelect: React.FC<Props> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="priority"
      render={({ field: { onChange, value } }) => (
        <Select onValueChange={onChange} defaultValue={value}>
          <SelectTrigger className="w-full py-2 border">
            <SelectValue placeholder="Choose task priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((p) => (
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
