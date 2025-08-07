import { useState } from 'react';
import { CREDENTIALS } from '../utils/constants';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const login = (username, password) => {
    const inputUsernameEncoded = btoa(username);
    const inputPasswordEncoded = btoa(password);

    if (inputUsernameEncoded === CREDENTIALS.USERNAME_ENCODED && 
        inputPasswordEncoded === CREDENTIALS.PASSWORD_ENCODED) {
      setIsLoggedIn(true);
      setLoginError(false);
      return true;
    } else {
      setLoginError(true);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoginError(false);
  };

  return {
    isLoggedIn,
    loginError,
    login,
    logout
  };
};
