import { injectable } from 'inversify';

import {
  lazyInject,
  IApiEntity,
} from 'react-application-core';

import {
  ILoginEntity,
  AuthApiService,
  IAuthApi,
  IAuthResponse,
  ISmsEntity,
} from '../auth';
import { IApi } from './api.interface';
import { IAppState } from '../app.interface';
import {
  PermissionApiService,
  IPermissionApi,
  IRoleEntity,
  IRightEntity,
} from '../permission';
import { AccountApiService, IAccountApi, IAccountEntity } from '../account';

@injectable()
export class ApiService implements IApi {
  @lazyInject(AuthApiService) private authApi: IAuthApi;
  @lazyInject(AccountApiService) private accountApi: IAccountApi;
  @lazyInject(PermissionApiService) private permissionApi: IPermissionApi;

  public accountGet(): Promise<IAccountEntity> {
    return this.accountApi.accountGet();
  }

  public accountRights(): Promise<string[]> {
    return this.accountApi.accountRights();
  }

  public authEnd(): Promise<boolean> {
    return this.authApi.authEnd();
  }

  public authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<IAuthResponse> {
    return this.authApi.authAccount(apiEntity);
  }

  public authNonce(apiEntity: IApiEntity<ISmsEntity>, state: IAppState): Promise<IAuthResponse> {
    return this.authApi.authNonce(apiEntity, state);
  }

  public saveRole(apiEntity: IApiEntity<IRoleEntity>): Promise<IRoleEntity> {
    return this.permissionApi.saveRole(apiEntity);
  }

  public searchRoles(query: string): Promise<IRoleEntity[]> {
    return this.permissionApi.searchRoles(query);
  }

  public loadRights(): Promise<IRightEntity[]> {
    return this.permissionApi.loadRights();
  }
}
