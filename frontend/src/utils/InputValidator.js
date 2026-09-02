function InputValidator(formData) {
  const error = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!formData.email || !formData.email.trim()) {
    error.email = "Email is required";
  } else if (!emailRegex.test(formData.email.trim())) {
    error.email = "Please enter a valid email address";
  }

  if (!formData.password || !formData.password.trim()) {
    error.password = "Password is required";
  } else if (!passwordRegex.test(formData.password.trim())) {
    error.password =
      "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character";
  }
  return error;
}

export default InputValidator;
