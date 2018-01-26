import {
  IApplicationPermissionsState,
  INamedEntity,
  MultiFieldEntityT,
} from 'react-application-core';

export interface IPermissionsState extends IApplicationPermissionsState<PermissionsT> {
}

export type PermissionsT = string[];
export type AccessConfigT = string | string[];

export interface IRightEntity extends INamedEntity {
}

export interface IRoleEntity extends INamedEntity {
  rights: MultiFieldEntityT<IRightEntity>;
}
