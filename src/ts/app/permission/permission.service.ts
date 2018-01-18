import { Store } from 'redux';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
  PermissionService,
} from 'react-application-core';

import { IPermissionsState, AccessConfigT } from './permission.interface';
import { IAppState } from '../app.interface';

@injectable()
export class AppPermissionService extends PermissionService<AccessConfigT> {

  @lazyInject(DI_TYPES.Store) private appStore: Store<IAppState>;

  public isAccessible(permissionObject: AccessConfigT): boolean {
    const permissionsState = this.permissionState.permissions;
    const permissions = permissionsState || [];

    return [].concat(permissionObject)
        .map((pObject) => permissions.includes(pObject))
        .reduce((pv, cv) => pv && cv);
  }

  public isAuthorized(): boolean {
    return true; // TODO
  }

  private get permissionState(): IPermissionsState {
    return this.appStore.getState().permissions;
  }
}
