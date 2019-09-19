import {
  IApiEntity,
  BaseTransport,
  provideInSingleton,
} from 'react-application-core';

import { ILoginEntity } from '../login';
import { IAuthApi, IAuthResponse } from './auth-api.interface';

@provideInSingleton(AuthApiService)
export class AuthApiService extends BaseTransport implements IAuthApi {

  public static AUTH_ACCOUNT = 'store.auth.account';

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
}
