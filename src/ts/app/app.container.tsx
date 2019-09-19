import * as React from 'react';

import {
  ApplicationContainer,
} from 'react-application-core';

import { IAppState } from './app.interface';

export class AppContainer extends ApplicationContainer<IAppState> {

  protected clearStateBeforeSerialization(state: IAppState): IAppState {
    // --------------------
    // System state
    // --------------------
    state.user = {};
    state.permissions = null;

    return super.clearStateBeforeSerialization(
      state,
      (key, value) => key !== 'progress',
      (key, value) => key !== 'password'
    );
  }
}
