import { IApiEntity } from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ILoginEntity } from '../login';
import { AuthTypeT } from '../auth.interface';

export interface IAuthResponse {
  auth?: string;
  nonce?: string;
  type?: AuthTypeT;
}

export interface IAuthApi {
  authEnd(): Promise<boolean>;
  authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<IAuthResponse>;
}
