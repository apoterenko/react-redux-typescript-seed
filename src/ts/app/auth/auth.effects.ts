import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  SignInEffects,
  SIGN_IN_DONE_ACTION_TYPE,
  ApplicationActionBuilder,
} from 'react-application-core';

@provideInSingleton(AuthEffects)
export class AuthEffects extends SignInEffects {

  @EffectsService.effects(SIGN_IN_DONE_ACTION_TYPE)
  public $onSignInDone(): IEffectsAction[] {
    return super.$onSignInDone().concat(
        ApplicationActionBuilder.buildPrepareAction()
    );
  }
}
