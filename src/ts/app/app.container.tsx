import * as React from 'react';

import {
  ApplicationContainer,
  INITIAL_PERMISSION_STATE,
} from 'react-application-core';

import { ILoginEntity } from './auth';
import { IAppState } from './app.interface';
import { IPermissionsState, AccessConfigT, PermissionsT } from './permission';
import { IDictionariesState } from './dictionary';

export class AppContainer extends ApplicationContainer<IAppState,
                                                       IDictionariesState,
                                                       IPermissionsState,
                                                       PermissionsT,
                                                       AccessConfigT> {

  protected clearStateBeforeSerialization(state: IAppState): IAppState {
    // --------------------
    // System state
    // --------------------
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
