import { IApplicationState } from 'react-application-core';

import { IAuthState } from './auth/auth.interface';
import { IRolesState } from './permission/roles/roles.interface';
import { IDictionariesState } from './dictionary/dictionaries.interface';
import { IPermissionsState, PermissionsT } from './permission/permission.interface';

export interface IAppState extends IApplicationState<IDictionariesState,
                                                     IPermissionsState,
                                                     PermissionsT> {
  auth: IAuthState;
  roles: IRolesState;
}
