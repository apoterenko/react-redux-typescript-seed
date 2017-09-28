import {
  IApplicationPermissionsService,
  IApplicationPermissionsState,
} from 'react-application-core';

export interface IPermissionsService extends IApplicationPermissionsService<AccessConfigT> {
}

export interface IPermissionsState extends IApplicationPermissionsState<PermissionsT> {
}

export type PermissionsT = string[];
export type AccessConfigT = string | string[];
