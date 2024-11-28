import React from 'react';

function InputSelect({ name, label, value, onChange, options }) {
  return (
    <div className="relative w-full">
      {/* Select */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full ring-2 ring-black h-8 mb-2 px-3 text-black border-spacing-2 border rounded focus:outline-none focus:ring-2 focus:ring-light_green_nave"
      >
        <option value="" disabled hidden></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Label com animação */}
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all ${
          value
            ? '-top-6 left-0 text-sm text-black' // Fixa o label no topo se um valor foi escolhido
            : 'top-1 text-base text-gray-400 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-1.5rem] peer-focus:left-0 peer-focus:text-black peer-focus:text-sm'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default InputSelect;
