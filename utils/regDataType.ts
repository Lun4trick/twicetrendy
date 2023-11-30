import { RegErrorType } from './authForm';

export interface RegData {
  email: {
    error: RegErrorType,
    message: string,
  },
  password: {
    error: RegErrorType,
    message: string,
  },
}