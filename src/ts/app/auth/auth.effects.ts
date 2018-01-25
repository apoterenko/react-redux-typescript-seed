import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  BaseEffects,
  SignInEffects,
  SIGN_IN_DONE_ACTION_TYPE,
  ApplicationActionBuilder,
} from 'react-application-core';

import { IAuthApi } from './api';
import { AUTH_DONE_ACTION_TYPE } from './auth.interface';
import { ROUTER_PATHS } from '../app.routes';

@provideInSingleton(AuthEffects)
export class AuthEffects extends SignInEffects {

  @EffectsService.effects(SIGN_IN_DONE_ACTION_TYPE)
  public $onSignInDone(): IEffectsAction[] {
    return super.$onSignInDone().concat(
        ApplicationActionBuilder.buildPrepareAction()
    );
  }
}
