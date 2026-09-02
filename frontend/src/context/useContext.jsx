import {
  createContext,
  useContext,
} from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const Login = (formData) => {
    const error = InputValidater(formData);

    if (Object.keys.length > 0) {
      return error;
    }
  };

  return <AuthContext.Provider value={Login}>{children}</AuthContext.Provider>;
};
