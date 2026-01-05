import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "../badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";

export interface Option {
  label: string;
  value: string;
  description?: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
}

const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  emptyText = "No items found.",
  searchPlaceholder = "Search...",
  className,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((s) => s !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 0 ? "h-auto min-h-10" : "h-10"
          } ${className}`}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length === 0 && (
              <span className="text-gray-500">{placeholder}</span>
            )}
            {selected.map((value) => {
              const option = options.find((o) => o.value === value);
              return (
                <Badge
                  variant="secondary"
                  key={value}
                  className="mr-1 mb-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(value);
                  }}
                >
                  {option?.label}
                  <span
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(value);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </span>
                </Badge>
              );
            })}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        }`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-gray-500">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
