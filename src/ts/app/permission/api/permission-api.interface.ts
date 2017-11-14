import { IApiEntity } from 'react-application-core';

import { IRightEntity, IRoleEntity } from '../permission.interface';

export interface IPermissionApi {
  saveRole(apiEntity: IApiEntity<IRoleEntity>): Promise<IRoleEntity>;
  searchRoles(query: string): Promise<IRoleEntity[]>;
  loadRights(): Promise<IRightEntity[]>;
}
