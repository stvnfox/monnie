import type { FunctionComponent } from "react";

import { groupedOptions } from "../helpers/category-selector-options";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type CategorySelectProps = {
  onValueChange: (value: string) => void;
};

export const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  onValueChange,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="select a category" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(groupedOptions).map(([category, options]) => (
          <SelectGroup key={category}>
            <SelectLabel className="-ml-4 lowercase">{category}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2 lowercase">
                  <span>{option.icon}</span>
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
