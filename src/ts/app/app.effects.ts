import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  ApplicationActionBuilder,
  ApplicationEffects,
  effectsBy,
  makeApplicationPrepareErrorEffectsProxy,
} from 'react-application-core';

import { IApi } from './api';
import { PermissionsT } from './permission';
import { IAccountEntity } from './account';

@provideInSingleton(AppEffects)
@effectsBy(makeApplicationPrepareErrorEffectsProxy)
export class AppEffects extends ApplicationEffects<IApi> {

  @EffectsService.effects(ApplicationActionBuilder.buildInitActionType())
  public onInit(): IEffectsAction[] {
    return super.onInit().concat(
        this.permissionService.isAuthorized()
            ? this.buildApplicationPrepareAction()
            : []
    );
  }

  @EffectsService.effects(ApplicationActionBuilder.buildPrepareActionType())
  public onPrepare(): Promise<IEffectsAction[]> {
    return Promise.all<IAccountEntity | PermissionsT>([this.api.accountGet(), this.api.accountRights()])
        .then((data: Array<IAccountEntity | PermissionsT>) => ([
          this.buildUserUpdateAction(data[0] as IAccountEntity),
          this.buildPermissionUpdateAction(data[1] as PermissionsT),
          this.buildApplicationReadyAction()
        ]));
  }
}
