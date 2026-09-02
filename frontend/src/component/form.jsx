export const FormWrapper = ({ children, onSubmit, action, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-20 max-w-[351px] lg:w-[351px] h-fit"
    >
      {children}
      <button
        type="submit"
        className={`px-4 py-3 w-full h-12  text-center font-semibold text-base rounded-md leading-6 ${className ? className : "bg-accent text-white"}
`}
      >
        {action}
      </button>
    </form>
  );
};
export const FormHeader = ({ children }) => {
  return <div>{children}</div>;
};
export const FormInput = ({
  labelFor,
  className,
  labelClassName,
  label,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={`${labelClassName ? labelClassName : "flex flex-col gap-1 font-semibold text-sm leading-5 text-text h-5"}`}
      >
        {label}
        <input
          {...props}
          className={`${className ? className : "outline-none h-13 px-4 py-3 rounded-xs border border-[#BDC8D1] text-base regular leading-6 text-text rounded-sm"}`}
        />
      </label>
    </div>
  );
};
