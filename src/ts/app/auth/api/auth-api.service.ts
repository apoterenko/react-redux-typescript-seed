import {
  IApiEntity,
  BaseTransport,
  provideInSingleton,
} from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ILoginEntity } from '../login';
import { IAuthApi, IAuthResponse } from './auth-api.interface';
import { ISmsEntity } from '../sms';

@provideInSingleton(AuthApiService)
export class AuthApiService extends BaseTransport implements IAuthApi {

  public static AUTH_ACCOUNT = 'store.auth.account';
  public static AUTH_NONCE = 'store.auth.nonce';

  public authEnd(): Promise<boolean> {
    return this.transport.request<boolean>({ name: 'store.auth.end' });
  }

  public authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<IAuthResponse> {
    return this.transport.request<IAuthResponse>({
      name: AuthApiService.AUTH_ACCOUNT,
      noAuth: true,
      params: apiEntity.changes,
    });
  }

  public authNonce(apiEntity: IApiEntity<ISmsEntity>, state: IAppState): Promise<IAuthResponse> {
    return this.transport.request<IAuthResponse>({
      name: AuthApiService.AUTH_NONCE,
      noAuth: true,
      params: {
        ...apiEntity.changes,
        nonce: state.transport.token,
      },
    });
  }
}
