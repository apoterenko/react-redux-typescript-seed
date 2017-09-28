import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provide,
  FormActionBuilder,
  BaseEffects,
} from 'react-application-core';

import { IApi } from '../../api';
import { ROUTER_PATHS } from '../../app.routers';
import { LOGIN_SECTION } from './login.interface';

@provide(LoginEffects)
export class LoginEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(LOGIN_SECTION))
  public onAuthAccount(action: IEffectsAction): Promise<IEffectsAction> {
    return this.api.authAccount(action.data)
        .then((result) => this.buildRouterNavigateAction(ROUTER_PATHS.AUTH_TOTP));
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(LOGIN_SECTION))
  public onAuthAccountError(action: IEffectsAction): IEffectsAction {
    return this.buildErrorNotificationAction(action);
  }
}
