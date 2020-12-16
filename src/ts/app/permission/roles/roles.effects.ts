import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  BaseEffects,
  buildEntityRoute,
  EffectsFactories,
  ListActionBuilder,
  effectsBy,
  provideInSingleton,
} from 'react-application-core';

import { IApi } from '../../api';
import { ROUTER_PATHS } from '../../app.routes';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';
import { ROLE_SECTION } from './role';

@provideInSingleton(RolesEffects)
@effectsBy(
  EffectsFactories.untouchedListEffectsProxy<IAppState>({
    listSection: ROLES_SECTION,
    listAccessor: (state) => state.roles.list,
  }),
  EffectsFactories.editedListEffectsProxy<IRoleEntity, IAppState>({
    listSection: ROLES_SECTION,
    formSection: ROLE_SECTION,
    path: (role) => buildEntityRoute<IRoleEntity>(ROUTER_PATHS.ROLE, role),
  }),
  EffectsFactories.filteredListEffectsProxy({listSection: ROLES_SECTION}),
  EffectsFactories.listLoadErrorEffectsProxy(ROLES_SECTION)
)
class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public $onRolesSearch(_: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    return this.api.searchRoles(state.roles.filter.query);
  }
}
