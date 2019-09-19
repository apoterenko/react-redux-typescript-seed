import {
  IStoreEntity,
} from 'react-application-core';

import { IAuthState } from './auth';
import { IRolesStateWrapper, PermissionsT } from './permission';
import { IAppDictionaries } from './dictionary';

export interface IAppState
  extends IStoreEntity<IAppDictionaries, PermissionsT>,
    IRolesStateWrapper {
  auth: IAuthState;
}
