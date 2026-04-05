import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  rows = 4,
  options = [],
}) => {
  const sharedProps = {
    name,
    value,
    onChange,
    placeholder,
  };

  return (
    <label className="input-group">
      <span>{label}</span>
      {as === "textarea" ? (
        <textarea {...sharedProps} rows={rows} />
      ) : as === "select" ? (
        <select {...sharedProps}>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : (
        <input {...sharedProps} type={type} />
      )}
    </label>
  );
};

export default InputField;
