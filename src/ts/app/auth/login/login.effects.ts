import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  BaseEffects,
  makeFailedFormEffectsProxy,
  effectsBy,
  ApplicationActionBuilder,
} from 'react-application-core';

import { IApi } from '../../api';
import { LOGIN_SECTION } from './login.interface';

@provideInSingleton(LoginEffects)
@effectsBy(makeFailedFormEffectsProxy(LOGIN_SECTION))
export class LoginEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(LOGIN_SECTION))
  public async onAuthAccount(action: IEffectsAction): Promise<IEffectsAction> {
    await this.api.authAccount(action.data);
    return ApplicationActionBuilder.buildAfterLoginAction();
  }
}
