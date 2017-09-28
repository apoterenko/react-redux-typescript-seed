import {
  IApiEntity,
  IMultiFieldAttributes,
  IIdentifiedEntity,
  IKeyValue,
} from 'react-application-core';

import { ILoginEntity } from '../auth/login/login.interface';
import { PermissionsT } from '../permission/permission.interface';

export interface IUser extends IIdentifiedEntity {
  name: string;
}

export interface IRight extends IIdentifiedEntity {
  name: string;
}

export interface IRole extends IIdentifiedEntity {
  name: string;
  rights: IRight[]|IMultiFieldAttributes;
}

export interface IActionBasicRequest<TQuery> {
  query: TQuery;
  section: string;
}

export interface IApi {
  accountGet(): Promise<IUser>;
  accountRights(): Promise<PermissionsT>;
  authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<string>;
  authNonce(request: IApiEntity<IKeyValue>): Promise<string>;
  saveRole(request: IApiEntity<IRole>): Promise<boolean|string>;
  searchRoles(request: IActionBasicRequest<string>): Promise<IRole[]>;
  loadRightsList(): Promise<IRight[]>;
}
