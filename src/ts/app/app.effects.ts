import { EffectsService, IEffectsAction, EffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  BaseEffects,
  ApplicationActionBuilder,
  lazyInject,
  DI_TYPES,
  IDateConverter,
} from 'react-application-core';

import { IApi } from './api';
import { PermissionsT, IPermissionsService } from './permission';
import { IAccountEntity } from './account';

@provideInSingleton(AppEffects)
export class AppEffects extends BaseEffects<IApi> {

  @lazyInject(DI_TYPES.DateConverter) protected dc: IDateConverter;
  @lazyInject(DI_TYPES.Permission) private permissionService: IPermissionsService;

  @EffectsService.effects(ApplicationActionBuilder.buildAfterInitActionType())
  public onAfterInit(): IEffectsAction {
    if (!this.permissionService.isAuthorized()) {
      return null;
    }
    return this.buildApplicationPrepareAction();
  }

  @EffectsService.effects(ApplicationActionBuilder.buildPrepareActionType())
  public onPrepare(): Promise<IEffectsAction[]> {
    return Promise.all<IAccountEntity | PermissionsT>(
        [this.api.accountGet(), this.api.accountRights()]
    ).then((data: Array<IAccountEntity | PermissionsT>) => ([
      this.buildUserUpdateAction(data[0] as IAccountEntity),
      this.buildPermissionUpdateAction(data[1] as PermissionsT),
      EffectsAction.create(ApplicationActionBuilder.buildPrepareDoneActionType())
    ]));
  }

  @EffectsService.effects(ApplicationActionBuilder.buildPrepareDoneActionType())
  public onPrepareDone(): IEffectsAction {
    return this.buildApplicationReadyAction();
  }

  @EffectsService.effects(ApplicationActionBuilder.buildAfterLogoutActionType())
  public onAfterLogout(_: IEffectsAction): Promise<IEffectsAction[]> {
    return this.api.authEnd()
        .then((result) => [
          this.buildNotificationInfoAction('You were logged out.'),
          this.buildTransportDestroyTokenAction()
        ]);
  }
}
