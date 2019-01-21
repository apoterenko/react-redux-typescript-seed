import {EffectsService, IEffectsAction} from 'redux-effects-promise';

import {
  provideInSingleton,
  ApplicationActionBuilder,
  ApplicationEffects,
  UserActionBuilder,
  PermissionsActionBuilder,
} from 'react-application-core';

import {IApi} from './api';
import {PermissionsT} from './permission';
import {IAccountEntity} from './account';

@provideInSingleton(AppEffects)
export class AppEffects extends ApplicationEffects<IApi> {

  @EffectsService.effects(ApplicationActionBuilder.buildPrepareActionType())
  public async $onPrepare(): Promise<IEffectsAction[]> {
    const data = await Promise.all<IAccountEntity | PermissionsT>([
      this.api.accountGet(),
      this.api.accountRights()
    ]);
    return [
      UserActionBuilder.buildUpdateAction({payload: data[0] as IAccountEntity}),
      PermissionsActionBuilder.buildUpdateAction(data[1]),
      ApplicationActionBuilder.buildPrepareDoneAction()
    ];
  }
}
