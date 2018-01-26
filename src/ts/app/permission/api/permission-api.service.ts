import {
  IApiEntity,
  provideInSingleton,
  BaseTransport,
  nvlEmpty,
  toEntityIds,
} from 'react-application-core';

import { IPermissionApi } from './permission-api.interface';
import { IRightEntity, IRoleEntity } from '../permission.interface';

@provideInSingleton(PermissionApiService)
export class PermissionApiService extends BaseTransport implements IPermissionApi {

  public saveRole(apiEntity: IApiEntity<IRoleEntity>): Promise<IRoleEntity> {
    return this.doSaveEntity({
      apiEntity,
      addApi: 'store.role.add',
      editApi: 'store.role.edit',
      extraParams: {
        rights: toEntityIds(apiEntity.changes.rights),
      },
    });
  }

  public searchRoles(query: string): Promise<IRoleEntity[]> {
    return this.transport.request<IRoleEntity[]>({
      name: 'store.role.list',
      params: {
        query: nvlEmpty(query),
      },
    });
  }

  public loadRights(): Promise<IRightEntity[]> {
    return this.transport.request<IRightEntity[]>({ name: 'store.right.list' });
  }
}
