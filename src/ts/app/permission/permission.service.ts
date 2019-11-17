import { Store } from 'redux';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
  PermissionsManager,
} from 'react-application-core';

import { AccessConfigT } from './permission.interface';
import { IAppState } from '../app.interface';

@injectable()
export class AppPermissionService extends PermissionsManager<AccessConfigT, IAppState> {

  @lazyInject(DI_TYPES.Store) private appStore: Store<IAppState>;

  public isAccessible(permissionObject: AccessConfigT): boolean {
    const permissionsState = this.getState().permissions;
    const permissions = permissionsState || [];

    return [].concat(permissionObject)
        .map((pObject) => permissions.includes(pObject))
        .reduce((pv, cv) => pv && cv);
  }
}
