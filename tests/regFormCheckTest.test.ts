import { regFormCheck } from '../customFunctions/regFormCheck';
import { RegErrorType } from '../utils/authForm';

const {
  NONE,
  EMAIL_EMPTY,
  EMAIL_INVALID,
  PASSWORD_EMPTY,
  PASSWORD_SHORT
} = RegErrorType;

describe('regFormCheck module', () => {
  test('should return an object with correct properties', () => {
    expect(regFormCheck('something@sometthing.com', 'somggfdsagdsg')).toStrictEqual(
      {
        email: {
          error: NONE,
          message: ''
        },
        password: {
          error: NONE,
          message: ''
        },
      }
    );
    });

  test('should return an object with correct properties', () => {
    expect(regFormCheck('something@sometthing.com', 'somg')).toStrictEqual(
      {
        email: {
          error: NONE,
          message: ''
        },
        password: {
          error: PASSWORD_SHORT,
          message: 'Password is too short'
        },
      }
    );
    });

  test('should return an object with correct properties', () => {
    expect(regFormCheck('', 'somggfdsagdsg')).toStrictEqual(
      {
        email: {
          error: EMAIL_EMPTY,
          message: 'Email is required'
        },
        password: {
          error: NONE,
          message: ''
        },
      }
    );
    });
  });
