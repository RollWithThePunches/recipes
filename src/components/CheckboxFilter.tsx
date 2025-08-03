"use client";

import Dropdown from "@/components/ui/dropdown";
import DropdownMenuItem from "@/components/ui/dropdown-menu-item";

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface CheckboxFilterProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function CheckboxFilter({
  title,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options",
  className = "",
}: CheckboxFilterProps) {
  const renderCheckboxItem = (item: FilterOption) => {
    const isSelected = selectedValues.includes(item.value);
    const handleToggle = (checked: boolean) => {
      if (checked) {
        onSelectionChange([...selectedValues, item.value]);
      } else {
        onSelectionChange(selectedValues.filter(v => v !== item.value));
      }
    };

    return (
      <DropdownMenuItem
        id={item.id}
        label={item.label}
        isSelected={isSelected}
        onToggle={handleToggle}
        variant="checkbox"
      />
    );
  };

  return (
    <Dropdown
      title={title}
      items={options}
      selectedValues={selectedValues}
      onSelectionChange={onSelectionChange}
      placeholder={placeholder}
      className={className}
      renderItem={renderCheckboxItem}
    />
  );
} 