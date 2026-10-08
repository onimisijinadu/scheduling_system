import { XCircleIcon } from "lucide-react";

export const Modal = ({ children, onCloseModal, isModalOpen, pt }) => {
  return (
    <div
      className={`${isModalOpen ? "flex" : "hidden"} flex-col gap-6 absolute p-6  z-40 bg-bg border border-border rounded-sm w-full h-fit sm:w-fit sm:h-fit translate-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      {onCloseModal && (
        <button
          type="button"
          onClick={onCloseModal}
          className={`flex fixed items-right right-2 top-2`}
        >
          <XCircleIcon />
        </button>
      )}
      <div className={`bg-bg w-full h-fit ${pt ? pt : "pt-4"}`}>{children}</div>
    </div>
  );
};

export const FormWrapper = ({ handleSubmit, className, children }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`${className ? className : "flex flex-col items-center w-full gap-5 bg-white"}`}
    >
      {children}
    </form>
  );
};

export const FormInputs = ({
  htmlFor,
  label,
  type,
  placeholder,
  className,
  divClassName,
  ...props
}) => {
  return (
    <div className={`${divClassName} w-full`}>
      <label htmlFor={htmlFor} className="text-xs font-bold text-slate-600">
        {label}
        <input
          type={type}
          placeholder={placeholder}
          {...props}
          className={`${className ? className : "w-full px-3 py-2 outline-none text-sm text-text regular rounded-md border border-border bg-bg "} `}
        />
      </label>
    </div>
  );
};
