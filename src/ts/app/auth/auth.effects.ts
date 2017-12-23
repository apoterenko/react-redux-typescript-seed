import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import { provideInSingleton, BaseEffects } from 'react-application-core';

import { IAuthApi } from './api';
import { AUTH_DONE_ACTION_TYPE } from './auth.interface';
import { ROUTER_PATHS } from '../app.routers';

@provideInSingleton(AuthEffects)
export class AuthEffects extends BaseEffects<IAuthApi> {

  @EffectsService.effects(AUTH_DONE_ACTION_TYPE)
  public onAuthDone(_: IEffectsAction): IEffectsAction[] {
    return [
      this.buildApplicationPrepareAction(),
      this.buildRouterNavigateAction(ROUTER_PATHS.HOME)
    ];
  }
}
