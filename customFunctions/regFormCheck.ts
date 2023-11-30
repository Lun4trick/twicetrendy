import { RegData } from '@utils/regDataType';
import { RegErrorType } from '../utils/authForm';

export function regFormCheck(email: string, password: string) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const {
    NONE,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    PASSWORD_EMPTY,
    PASSWORD_SHORT
  } = RegErrorType;

  const regData: RegData = {
    email: {
      error: NONE,
      message: ''
    },
    password: {
      error: NONE,
      message: ''
    },
  }

  if (!email.length) {
    regData.email.error = EMAIL_EMPTY;
    regData.email.message = 'E-mail kötelező';
  } else if (!emailRegex.test(email)) {
    regData.email.error = EMAIL_INVALID;
    regData.email.message = 'Nem megfelelő e-mail cím';
  }

  if (!password.length) {
    regData.password.error = PASSWORD_EMPTY;
    regData.password.message = 'Jelszó kötelező';
  } else if (password.length < 8) {
    regData.password.error = PASSWORD_SHORT;
    regData.password.message = 'Minimum 8 karakter';
  }

  return regData;
}