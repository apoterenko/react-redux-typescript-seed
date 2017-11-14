import {
  IApplicationPermissionService,
  IApplicationPermissionsState,
  INamedEntity,
  IMultiFieldAttributes,
} from 'react-application-core';

export interface IPermissionsService extends IApplicationPermissionService<AccessConfigT> {
}

export interface IPermissionsState extends IApplicationPermissionsState<PermissionsT> {
}

export type PermissionsT = string[];
export type AccessConfigT = string | string[];

export interface IRightEntity extends INamedEntity {
}

export interface IRoleEntity extends INamedEntity {
  rights: IRightEntity[]|IMultiFieldAttributes;
}
