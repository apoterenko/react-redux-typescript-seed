import { IApplicationFormState } from 'react-application-core';

export interface IAuthState {
  restore: IApplicationFormState;
  login: IApplicationFormState;
  totp: IApplicationFormState;
  signup: IApplicationFormState;
}
