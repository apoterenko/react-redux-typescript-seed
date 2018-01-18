import * as React from 'react';

import {
  ApplicationContainer,
  INITIAL_PERMISSION_STATE,
  PROGRESSABLE_FIELD_NAME,
  filterBy,
} from 'react-application-core';

import { IAppState } from './app.interface';

export class AppContainer extends ApplicationContainer<IAppState> {

  protected clearStateBeforeSerialization(state: IAppState): IAppState {
    // --------------------
    // System state
    // --------------------
    state.user = {};
    state.permissions = INITIAL_PERMISSION_STATE;

    // --------------------
    // Business logic state
    // --------------------
    filterBy(state, (key, value) => (
      key !== PROGRESSABLE_FIELD_NAME
      && key !== 'password'
    ));
    return super.clearStateBeforeSerialization(state);
  }
}
