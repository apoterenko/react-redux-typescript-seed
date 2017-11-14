import { IEffectsAction, EffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  BaseEffects,
  FormActionBuilder,
} from 'core';

import { IAuthApi } from '../api';
import { SMS_SECTION } from './sms.interface';
import { AUTH_DONE_ACTION_TYPE } from '../auth.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(SmsEffects)
export class SmsEffects extends BaseEffects<IAuthApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(SMS_SECTION))
  public onAuthNonce(action: IEffectsAction, state: IAppState): Promise<IEffectsAction> {
    return this.api.authNonce(action.data, state)
        .then((result) => EffectsAction.create(AUTH_DONE_ACTION_TYPE));
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(SMS_SECTION))
  public onAuthNonceError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }
}
