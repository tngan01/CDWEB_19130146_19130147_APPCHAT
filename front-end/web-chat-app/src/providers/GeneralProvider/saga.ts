import _get from 'lodash/get';
import { call } from 'redux-saga/effects';
import { ERRORS } from 'utils/constants';
import Helper from 'utils/Helper';
import { message } from 'antd';

export class ApiError {
  message: string;

  // code: number;

  constructor(error:string) {
    this.message = error;
  }
}

export function* callApi<T1 extends unknown[]>(
  fn: (...fnArgs: unknown[]) => void,
  ...args: T1
): Generator<unknown> {
  try {
    
    return yield call(fn, ...args);
  } catch (error) {

    const errorCode = _get(error, 'code');
    console.log('error', error);

    // NOTE: Replace with your server's code
    if (Number(errorCode) === ERRORS.INVALID_SESSION_TOKEN.code) {
      Helper.removeAuthToken();
      Helper.removeAuthrefreshToken();
      window.location.href = '/login';
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new ApiError(error);
  }
}
