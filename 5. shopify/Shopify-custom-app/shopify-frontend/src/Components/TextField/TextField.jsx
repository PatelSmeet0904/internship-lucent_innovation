import React from "react";
import "./TextField.css";

const TextField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}) => {
  const hasValue = value && value.length > 0;
  const inputClassNames = `text-field__input${
    hasValue ? " text-field__input--has-text" : ""
  }`;

  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={inputClassNames}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {error && <div className="text-field__error">{error}</div>}
    </div>
  );
};

export default TextField;
