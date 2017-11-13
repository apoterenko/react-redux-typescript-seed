import { IEffectsAction, EffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  BaseEffects,
  FormActionBuilder,
} from 'react-application-core';

import { IAuthApi } from '../api';
import { TOTP_SECTION } from './totp.interface';
import { AUTH_DONE_ACTION_TYPE } from '../auth.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(TotpEffects)
export class TotpEffects extends BaseEffects<IAuthApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(TOTP_SECTION))
  public onAuthNonce(action: IEffectsAction, state: IAppState): Promise<IEffectsAction> {
    return this.api.authNonce(action.data, state)
        .then((result) => EffectsAction.create(AUTH_DONE_ACTION_TYPE));
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(TOTP_SECTION))
  public onAuthNonceError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }
}
