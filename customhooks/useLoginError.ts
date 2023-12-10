import { useState } from 'react';

type LoginError = {
  message: string;
  status: number;
}

export const useLoginError = (error = {message: '', status: 0}): [LoginError, (loginError: LoginError) => void] => {
  const [errorMessage, setErrorMessage] = useState(error.message);
  const [errorStatus, setErrorStatus] = useState(error.status);

  const setLoginError = (error: LoginError) => {
    setErrorMessage(error.message);
    setErrorStatus(error.status);
  };
  return [{message: errorMessage, status: errorStatus}, setLoginError];
};