import {
  IApplicationState,
  IApplicationPermissionsWrapperState,
} from 'react-application-core';

import { IAuthState } from './auth';
import { IRolesState, PermissionsT } from './permission';
import { IDictionariesState } from './dictionary';

export interface IAppState extends IApplicationState<IDictionariesState>,
                                   IApplicationPermissionsWrapperState<PermissionsT> {
  auth: IAuthState;
  roles: IRolesState;
}
