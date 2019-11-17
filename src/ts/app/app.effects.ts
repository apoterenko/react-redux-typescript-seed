import {EffectsService, IEffectsAction} from 'redux-effects-promise';

import {
  ApplicationActionBuilder,
  ApplicationEffects,
  PermissionsActionBuilder,
  provideInSingleton,
  userActionBuilder,
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
      userActionBuilder.buildReplaceAction(data[0]),
      PermissionsActionBuilder.buildUpdateAction(data[1]),
      ApplicationActionBuilder
    ];
  }
}
