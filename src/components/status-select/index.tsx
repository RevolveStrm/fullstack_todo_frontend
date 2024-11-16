import React from 'react';
import { Controller } from 'react-hook-form';
import { statuses } from '../tasks-table/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
  className?: string;
  control: any;
}

export const StatusSelect: React.FC<Props> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="status"
      render={({ field: { onChange, value } }) => (
        <Select onValueChange={onChange} defaultValue={value}>
          <SelectTrigger className="w-full py-2 border">
            <SelectValue placeholder="Choose task status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((p) => (
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
