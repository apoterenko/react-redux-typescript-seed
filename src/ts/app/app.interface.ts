import {
  IApplicationStoreEntity,
  IApplicationPermissionsWrapperState,
} from 'react-application-core';

import { IAuthState } from './auth';
import { IRolesStateWrapper, PermissionsT } from './permission';
import { IAppDictionaries } from './dictionary';

export interface IAppState extends IApplicationStoreEntity<IAppDictionaries>,
                                   IApplicationPermissionsWrapperState<PermissionsT>,
                                   IRolesStateWrapper {
  auth: IAuthState;
}
