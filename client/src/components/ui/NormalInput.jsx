import { forwardRef } from "react";

const NormalInput = forwardRef(
  ({ type = "text", placeholder, onBlur, onChange, className }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        className={`w-full p-2 rounded-md bg-secondary placeholder:text-secondary-foreground
        outline-none transition-all duration-300
        hover:shadow-[var(--accent-secondary)_0_0_0_2px] focus:shadow-[var(--accent-secondary)_0_0_0_2px]
        active:shadow-[var(--highlight)_0_0_0_2px] ${className}`}
      />
    );
  }
);

export default NormalInput;
