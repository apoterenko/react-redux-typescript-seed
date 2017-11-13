import * as React from 'react';

import {
  ApplicationContainer,
  IApplicationContainerProps,
  ContainerVisibilityTypeEnum,
  INITIAL_PERMISSION_STATE,
  INITIAL_DICTIONARIES_STATE,
} from 'react-application-core';

import { ILoginEntity } from './auth';
import { IAppState } from './app.interface';
import { ROUTER_PATHS } from './app.routers';
import { IPermissionsState, AccessConfigT, PermissionsT } from './permission';
import { IDictionariesState } from './dictionary';

export class AppContainer extends ApplicationContainer<IAppState,
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
    state.dictionaries = INITIAL_DICTIONARIES_STATE;
    state.user = {};
    state.permission = INITIAL_PERMISSION_STATE;

    // --------------------
    // Business logic state
    // --------------------

    // Login
    const loginState = state.auth.login;
    const loginEntity = loginState.changes as ILoginEntity;
    delete loginState.progress;
    delete loginEntity.password;

    return super.clearStateBeforeSerialization(state);
  }
}
