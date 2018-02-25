import * as React from 'react';

import {
  ApplicationContainer,
  INITIAL_PERMISSION_STATE,
  NOT_PASSWORD_FIELD_PREDICATE,
  NOT_PROGRESS_FIELD_PREDICATE,
} from 'react-application-core';

import { IAppState } from './app.interface';

export class AppContainer extends ApplicationContainer<IAppState> {

  protected clearStateBeforeSerialization(state: IAppState): IAppState {
    // --------------------
    // System state
    // --------------------
    state.user = {};
    state.permissions = INITIAL_PERMISSION_STATE;

    return super.clearStateBeforeSerialization(
      state,
      NOT_PROGRESS_FIELD_PREDICATE,
      NOT_PASSWORD_FIELD_PREDICATE
    );
  }
}
