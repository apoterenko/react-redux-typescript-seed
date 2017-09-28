import { AnyAction } from 'redux';
import { EffectsAction, EffectsService, IEffectsAction } from 'redux-effects-promise';

import {
  provide,
  ListActionBuilder,
  FilterActionBuilder,
  RouterActionBuilder,
  NotificationActionBuilder,
  BaseEffects,
  NEW_OPTION,
} from 'react-application-core';

import { IApi, IRole } from '../../api/api.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { ROLES_SECTION } from './roles.interface';

@provide(RolesEffects)
export class RolesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(ListActionBuilder.buildLoadActionType(ROLES_SECTION))
  public onRolesSearch(action: AnyAction): Promise<IRole[]> {
    return this.api.searchRoles(action.data);
  }

  @EffectsService.effects(ListActionBuilder.buildLoadErrorActionType(ROLES_SECTION))
  public onRolesSearchError(action: IEffectsAction): IEffectsAction {
    return NotificationActionBuilder.buildErrorAction(action);
  }

  @EffectsService.effects(ListActionBuilder.buildSelectActionType(ROLES_SECTION))
  public onRoleSelect(action: AnyAction): IEffectsAction[] {
    const role = action.data.selected as IRole;
    return [
      ListActionBuilder.buildLockAction(ROLES_SECTION),
      FilterActionBuilder.buildLockAction(ROLES_SECTION),
      RouterActionBuilder.buildNavigateAction(ROUTER_PATHS.ROLE.replace(':id', String(role.id)))
    ];
  }

  @EffectsService.effects(ListActionBuilder.buildAddItemActionType(ROLES_SECTION))
  public onAddRole(action: AnyAction): IEffectsAction[] {
    return [
      ListActionBuilder.buildLockAction(ROLES_SECTION),
      FilterActionBuilder.buildLockAction(ROLES_SECTION),
      RouterActionBuilder.buildNavigateAction(ROUTER_PATHS.ROLE.replace(':id', NEW_OPTION))
    ];
  }
}
