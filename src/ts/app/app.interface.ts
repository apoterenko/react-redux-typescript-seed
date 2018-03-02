import {
  IApplicationState,
  IApplicationPermissionsWrapperState,
} from 'react-application-core';

import { IAuthState } from './auth';
import { IRolesState, PermissionsT } from './permission';
import { IAppDictionaries } from './dictionary';

export interface IAppState extends IApplicationState<IAppDictionaries>,
                                   IApplicationPermissionsWrapperState<PermissionsT> {
  auth: IAuthState;
  roles: IRolesState;
}
