import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router';
import { toast } from 'react-toastify';

import {
  FormInput,
  FormWrapper,
} from '../../component/form';
import { SelectOptions } from '../../component/selectOption';
import InputValidator from '../../utils/InputValidator';

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validateError = InputValidator(formData);

      const errorKeys = Object.keys(validateError || {});

      if (errorKeys.length > 0) {
        // Displays the first validation error to keep UI tidy
        toast.error(validateError[errorKeys[0]]);
        return;
      }

      console.log(formData);
      navigate("/dashboard");
      toast.success("Welcome...");

      // Once you hook up your API, place your await call here:
      // await loginUser(formData);
    } catch (err) {
      console.log(err.message);
      toast.error(
        err.message || "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto w-full max-w-4xl min-h-screen bg-bg">
        {/* LEFT DESC ON LARGE SCREEN */}
        <div className="flex flex-col items-center justify-center w-full min-h-[172px] lg:h-139 bg-bg-second lg:border border-[#BDC8D1] px-4">
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
        <div className="flex  flex-col items-center gap-2 w-full min-h-139 py-5 lg:px-12 lg:py-10 border border-[#BDC8D1]">
          <FormWrapper onSubmit={handleSubmit} action={"Sign In"}>
            <SelectOptions
              labelFor={"Role"}
              label={"Role"}
              id={"role"}
              name={"role"}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="faculty_exam_officer">Faculty Exam Officer</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </SelectOptions>
            <div>
              <FormInput
                labelFor={"email"}
                label={"Email Address"}
                name={"email"}
                value={formData.email}
                onChange={handleChange}
                required
                type={"email"}
                placeholder={"user@university.edu"}
              />
            </div>
            <div>
              <FormInput
                labelFor={"password"}
                label={"Password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                required
                type={"password"}
                placeholder={"••••••••"}
              />
            </div>
          </FormWrapper>
          <div className="flex justify-center items-center text-center pt-5 w-full">
            <Link
              to="/"
              className="text-center regular text-sm leading-5 text-accent"
            >
              Forgot your password
            </Link>
          </div>
          <div className="pt-6 w-full flex flex-col items-center">
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
