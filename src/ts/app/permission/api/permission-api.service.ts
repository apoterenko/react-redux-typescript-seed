import {
  IApiEntity,
  provideInSingleton,
  BaseTransport,
  nvlEmpty,
  IMultiFieldAttributes,
} from 'react-application-core';

import { toActualSnapshot } from '../../util/field';
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
        rights: toActualSnapshot(apiEntity.changes.rights as IMultiFieldAttributes),
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
