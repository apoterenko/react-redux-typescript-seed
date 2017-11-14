import { IApiEntity } from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ILoginEntity } from '../login';
import { AuthTypeT } from '../auth.interface';
import { ISmsEntity } from '../sms';

export interface IAuthResponse {
  auth?: string;
  nonce?: string;
  type?: AuthTypeT;
}

export interface IAuthApi {
  authEnd(): Promise<boolean>;
  authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<IAuthResponse>;
  authNonce(apiEntity: IApiEntity<ISmsEntity>, state: IAppState): Promise<IAuthResponse>;
}
