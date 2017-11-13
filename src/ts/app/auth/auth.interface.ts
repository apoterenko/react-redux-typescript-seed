import { IApplicationFormState } from 'react-application-core';

export interface IAuthState {
  login: IApplicationFormState;
  totp: IApplicationFormState;
}

export const AUTH_DONE_ACTION_TYPE = 'auth.done';
