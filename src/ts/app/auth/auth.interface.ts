import { IApplicationFormState } from 'react-application-core';

export interface IAuthState {
  login: IApplicationFormState;
  sms: IApplicationFormState;
}

export type AuthTypeT = 'sms' | 'call' | 'totp' | 'none';

export const AUTH_DONE_ACTION_TYPE = 'auth.done';
