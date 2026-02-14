"use client";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
}

export function Select({
  options,
  label,
  placeholder = "Select...",
  error,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-cool-gray mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`
          h-10 w-full rounded-md border bg-slate-blue px-3 py-2 text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-danger" : "border-slate-600"}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
