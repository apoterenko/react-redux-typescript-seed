import {
  provideInSingleton,
  BaseTransport,
} from 'react-application-core';

import { IAccountApi } from './account-api.interface';
import { IAccountEntity } from '../account.interface';
import { PermissionsT } from '../../permission';

@provideInSingleton(AccountApiService)
export class AccountApiService extends BaseTransport implements IAccountApi {

  public accountGet(): Promise<IAccountEntity> {
    return this.transport.request<IAccountEntity>({
      name: 'store.account.get',
    });
  }

  public accountRights(): Promise<PermissionsT> {
    return this.transport.request<PermissionsT>({
      name: 'store.account.rights',
    });
  }
}
