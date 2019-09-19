import {
  INamedEntity,
  MultiFieldEntityT,
} from 'react-application-core';

export type PermissionsT = string[];
export type AccessConfigT = string | string[];

export interface IRightEntity extends INamedEntity {
}

export interface IRoleEntity extends INamedEntity {
  rights: MultiFieldEntityT<IRightEntity>;
}
