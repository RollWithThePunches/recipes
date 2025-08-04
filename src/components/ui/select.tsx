"use client"

import * as React from "react"
import Dropdown from "./dropdown"
import DropdownMenuItem from "./dropdown-menu-item"

// Dropdown-based Select components
interface SelectProps {
  title?: string;
  options: { id: string; label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const Select = ({ title = "", options, value, onValueChange, placeholder = "Select an option", className, required }: SelectProps) => {
  const selectedValues = value ? [value] : [];
  
  const handleSelectionChange = (values: string[]) => {
    onValueChange(values[0] || "");
  };

  const renderSelectItem = (item: { id: string; label: string; value: string }) => {
    return (
      <DropdownMenuItem
        id={item.id}
        label={item.label}
        onClick={() => onValueChange(item.value)}
        variant="menu"
      />
    );
  };

  return (
    <Dropdown
      title={title}
      items={options}
      selectedValues={selectedValues}
      onSelectionChange={handleSelectionChange}
      placeholder={placeholder}
      className={className}
      renderItem={renderSelectItem}
      required={required}
      closeOnSelection={true}
    />
  );
};

// Multi-select version
interface MultiSelectProps {
  title: string;
  options: { id: string; label: string; value: string }[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect = ({ title, options, values, onValuesChange, placeholder = "Select options", className }: MultiSelectProps) => {
  const renderMultiSelectItem = (item: { id: string; label: string; value: string }) => {
    const isSelected = values.includes(item.value);
    
    return (
      <DropdownMenuItem
        id={item.id}
        label={item.label}
        isSelected={isSelected}
        onToggle={(checked) => {
          if (checked) {
            onValuesChange([...values, item.value]);
          } else {
            onValuesChange(values.filter(v => v !== item.value));
          }
        }}
        variant="checkbox"
      />
    );
  };

  return (
    <Dropdown
      title={title}
      items={options}
      selectedValues={values}
      onSelectionChange={onValuesChange}
      placeholder={placeholder}
      className={className}
      renderItem={renderMultiSelectItem}
    />
  );
};

// Legacy exports for backward compatibility
const SelectGroup = Select;
const SelectValue = Select;

export {
  Select,
  SelectGroup,
  SelectValue,
  MultiSelect,
} 