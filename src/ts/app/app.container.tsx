import * as React from 'react';

import {
  ApplicationContainer,
  IApplicationContainerProps,
  NOTIFICATION_INFO_ACTION_TYPE,
  ContainerVisibilityTypeEnum,
} from 'react-application-core';

import { ILoginEntity, LOGIN_SECTION } from './auth';
import { IAppState } from './app.interface';
import { ROUTER_PATHS } from './app.routers';
import { IPermissionsState, AccessConfigT, PermissionsT } from './permission';
import { IDictionariesState } from './dictionary/dictionaries.interface';

export class AppContainer extends ApplicationContainer<IAppState,
                                                       IApplicationContainerProps,
                                                       IDictionariesState,
                                                       IPermissionsState,
                                                       PermissionsT,
                                                       AccessConfigT> {

  constructor(props: IApplicationContainerProps) {
    super(props);

    this.registerRouter(
        this.lookupConnectComponentByRoutePath(ROUTER_PATHS.AUTH_LOGIN),
        {
          routeConfig: {
            type: ContainerVisibilityTypeEnum.PUBLIC,
            path: ROUTER_PATHS.LOGOUT,
            beforeEnter: this.onBeforeLogout,
          },
        }
    );
  }

  protected clearStateBeforeSerialization(state: IAppState): IAppState {
    // --------------------
    // System state
    // --------------------
    delete state.dictionaries;

    // --------------------
    // Business logic state
    // --------------------
    delete state.roles;

    // Login
    const loginState = state.auth.login;
    const loginEntity = loginState.changes as ILoginEntity;
    delete loginEntity.password;

    return super.clearStateBeforeSerialization(state);
  }

  protected afterDestroySession(): void {
    super.afterDestroySession();

    this.appStore.dispatch({
      type: NOTIFICATION_INFO_ACTION_TYPE,
      data: {
        section: LOGIN_SECTION,
        info: 'You were logged out.',
      },
    });
  }
}
