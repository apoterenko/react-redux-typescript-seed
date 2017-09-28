import { IEffectsAction, EffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provide,
  BaseEffects,
  FormActionBuilder,
} from 'react-application-core';

import { IApi, IUser } from '../../api';
import { ROUTER_PATHS } from '../../app.routers';
import { TOTP_SECTION } from './totp.interface';
import { PermissionsT } from '../../permission';

@provide(TotpEffects)
export class TotpEffects extends BaseEffects<IApi> {

  private static TOTP_AUTH_NONCE_DONE_ACTION_TYPE = `${TOTP_SECTION}.auth.nonce.done`;

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(TOTP_SECTION))
  public onAuthNonce(action: IEffectsAction): Promise<IEffectsAction[]> {
    return this.api.authNonce(action.data)
        .then((result) => ([
          this.buildPermissionAuthorizedUpdateAction(),
          EffectsAction.create(TotpEffects.TOTP_AUTH_NONCE_DONE_ACTION_TYPE)
        ]));
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(TOTP_SECTION))
  public onAuthNonceError(action: IEffectsAction): IEffectsAction {
    return this.buildErrorNotificationAction(action);
  }

  @EffectsService.effects(TotpEffects.TOTP_AUTH_NONCE_DONE_ACTION_TYPE)
  public onAuthNonceDone(): Promise<IEffectsAction[]> {
    return Promise.all<IUser | PermissionsT>([this.api.accountGet(), this.api.accountRights()])
        .then((data: Array<IUser | PermissionsT>) => ([
          this.buildFormSubmitDoneAction(TOTP_SECTION),
          this.buildUserUpdateAction(data[0] as IUser),
          this.buildPermissionPermissionsUpdateAction(data[1] as PermissionsT),
          this.buildRouterNavigateAction(ROUTER_PATHS.ROLES)
        ]));
  }
}
