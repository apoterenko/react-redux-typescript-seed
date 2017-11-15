import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  ListActionBuilder,
  BaseEffects,
  NEW_OPTION,
  effectsBy,
  makeFilteredListEffectsProxy,
  makeUntouchedListEffectsProxy,
  makeFailedListEffectsProxy,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(RolesEffects)
@effectsBy(
    makeUntouchedListEffectsProxy<IAppState>({
      section: ROLES_SECTION,
      listWrapperStateResolver: (state) => state.roles,
    }),
    makeFilteredListEffectsProxy({
      section: ROLES_SECTION,
    }),
    makeFailedListEffectsProxy(ROLES_SECTION)
)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public onRolesSearch(_: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    return this.api.searchRoles(state.roles.filter.query);
  }

  @EffectsService.effects(ListActionBuilder.buildSelectActionType(ROLES_SECTION))
  public onRolesEntitySelect(action: IEffectsAction): IEffectsAction[] {
    return this.buildOpenListEntityActions(
        ROLES_SECTION,
        this.buildRoleRoutePath(action.data.selected.id)
    );
  }

  @EffectsService.effects(ListActionBuilder.buildAddItemActionType(ROLES_SECTION))
  public onRolesEntityCreate(): IEffectsAction[] {
    return this.buildOpenListEntityActions(ROLES_SECTION, this.buildRoleRoutePath(NEW_OPTION));
  }

  private buildRoleRoutePath(id: string|number): string {
    return ROUTER_PATHS.ROLE.replace(':id', String(id));
  }
}
