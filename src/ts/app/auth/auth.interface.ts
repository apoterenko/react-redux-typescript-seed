import { IEditableEntity } from 'react-application-core';

export interface IAuthState {
  login: IEditableEntity;
}

export type AuthTypeT = 'sms' | 'call' | 'totp' | 'none';
