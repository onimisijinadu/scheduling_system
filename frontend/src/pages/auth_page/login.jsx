import { Link } from 'react-router';

import {
  FormInput,
  FormWrapper,
} from '../component/form';
import { SelectOptions } from '../component/selectOption';

export const Login = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto w-full max-w-4xl min-h-screen bg-bg">
        {/* LEFT DESC ON LARGE SCREEN */}
        <div className="flex flex-col items-center justify-center w-full min-h-[172px] lg:h-145 bg-bg-second lg:border border-[#BDC8D1] px-4">
          <div className="w-30 h-20 mb-8">
            <img
              src="/buklogo.svg"
              alt="BUK Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className=" font-semibold pb-2 leading-8 tracking-tight text-text text-2xl">
            Faculty of Computing
          </h2>
          <p className="text-base font-semibold leading-6 text-text-h">
            Exam Scheduling Portal
          </p>
          <p className="w-[340px] text-center py-4 pt-8 text-text-h regular text-sm leading-5">
            Secure access to the university's examination management system
          </p>
        </div>
        {/* LOGIN PAGE INPUTS AND BUTTON */}
        <div className="flex  flex-col items-center gap-2 w-full min-h-139.25 py-5 lg:p-12 border border-[#BDC8D1]">
          <FormWrapper action={"Sign In"}>
            <SelectOptions
              labelFor={"Role"}
              label={"Role"}
              id={"role"}
              name={"role"}
            >
              <option value="">Faculty Exam Officer</option>
              <option value="">Lecturer</option>
              <option value="">Admin</option>
            </SelectOptions>
            <FormInput
              labelFor={"email"}
              label={"Email Address"}
              required
              type={"email"}
              placeholder={"user@university.edu"}
            />
            <FormInput
              labelFor={"password"}
              label={"Password"}
              required
              type={"password"}
              placeholder={"••••••••"}
            />
          </FormWrapper>
          <div className="flex justify-center items-center text-center pt-6 w-full">
            <Link
              to="/"
              className="text-center regular text-sm leading-5 text-accent"
            >
              Forgot your password
            </Link>
          </div>
          <div className="pt-8 w-full flex flex-col items-center">
            <div className="border-b border-b-[#3E4850] w-full"></div>
            <div className="flex justify-center  w-full text-center">
              <p className="pt-5 text-sm text-center leading-5">
                Need help? Contact{" "}
                <Link to="/" className=" regular text-sm leading-5 text-accent">
                  IT Support.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
