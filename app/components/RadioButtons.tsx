import React from "react";

type RadioOption = { value: string; label: string };

type RadioButtonsProps = {
  options: RadioOption[]; // Array of radio button options
  selectedValue: string; // Currently selected value
  setSelectedValue: (value: string) => void; // Function to update the selected value
};

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => setSelectedValue(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
