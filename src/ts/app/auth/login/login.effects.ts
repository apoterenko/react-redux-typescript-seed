import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  BaseEffects,
} from 'react-application-core';

import { IApi } from '../../api';
import { ROUTER_PATHS } from '../../app.routers';
import { LOGIN_SECTION } from './login.interface';

@provideInSingleton(LoginEffects)
export class LoginEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(LOGIN_SECTION))
  public onAuthAccount(action: IEffectsAction): Promise<IEffectsAction> {
    return this.api.authAccount(action.data)
        .then(() => this.buildRouterNavigateAction(ROUTER_PATHS.AUTH_SMS));
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(LOGIN_SECTION))
  public onAuthAccountError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }
}
