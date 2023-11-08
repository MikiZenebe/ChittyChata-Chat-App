/* eslint-disable react/display-name */
import React from "react";

const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => (
    <div className="w-full flex flex-col mt-2">
      {label && (
        <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
      )}

      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          className={`transition-all duration-[300ms] ease-out bg-secondary rounded px-2 border-[#66666690] outline-none text-sm text-ascent-1  placeholder:text-[#666] focus:outline-none focus:ring-2 focus:ring-[#258dee] focus:border-transparent ${styles}`}
          {...register}
          aria-invalid={error ? "true" : "false"}
        />
      </div>

      {error && (
        <span className="text-xs text-[#f64949fe] mt-0.5">{error}</span>
      )}
    </div>
  )
);

export default TextInput;
