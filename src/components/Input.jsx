import React from "react";

function Input({ label, type, placeholder, onChange, name, defaultValue }) {
  return (
    <>
      <label className="flex items-center gap-2 input input-bordered">
        {label}
        <input
          name={name}
          type={type}
          className="grow"
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
          required
        />
      </label>
    </>
  );
}

export default Input;
