export const SelectOptions = ({
  children,
  id,
  name,
  className,
  labelClassName,
  label,
  labelFor,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={`${labelClassName ? labelClassName : "flex flex-col gap-1 font-semibold text-sm leading-5 text-text h-5 "}`}
      >
        {label}
        <select
          name={name}
          id={id}
          {...props}
          className={`${className ? className : "outline-none h-13 px-4 py-3 rounded-sm border border-[#BDC8D1] text-base regular leading-6 text-text"} `}
        >
          {children}
        </select>
      </label>
    </div>
  );
};
