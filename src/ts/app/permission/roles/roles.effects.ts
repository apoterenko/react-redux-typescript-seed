import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provideInSingleton,
  ListActionBuilder,
  FilterActionBuilder,
  BaseEffects,
  ConnectorActionBuilder,
  NEW_OPTION,
} from 'react-application-core';

import { IApi } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { ROLES_SECTION } from './roles.interface';
import { IRoleEntity } from '../permission.interface';
import { IAppState } from '../../app.interface';

@provideInSingleton(RolesEffects)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public onRolesSearch(action: IEffectsAction, state: IAppState): Promise<IRoleEntity[]> {
    const query = state.roles.filter.query;
    return this.api.searchRoles(query);
  }

  @EffectsService.effects(ListActionBuilder.buildLoadErrorActionType(ROLES_SECTION))
  public onRolesSearchError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }

  @EffectsService.effects(FilterActionBuilder.buildApplyActionType(ROLES_SECTION))
  public onRolesFilterApply(): IEffectsAction {
    return this.doRolesLoad();
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

  @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(ROLES_SECTION))
  public onRolesInit(_: IEffectsAction, state: IAppState): IEffectsAction {
    return this.buildUntouchedListLoadAction(ROLES_SECTION, state.roles);
  }

  private doRolesLoad(): IEffectsAction {
    return this.buildListLoadAction(ROLES_SECTION);
  }

  private buildRoleRoutePath(id: string|number): string {
    return ROUTER_PATHS.ROLE.replace(':id', String(id));
  }
}
