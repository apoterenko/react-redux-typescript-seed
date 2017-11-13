import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  IApiEntity,
  BaseEffects,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../../app.routers';
import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi } from '../../../api/api.interface';
import { IRoleEntity } from '../../permission.interface';

@provideInSingleton(RoleEffects)
export class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IEffectsAction[]> {
    const apiEntity = action.data as IApiEntity<IRoleEntity>;
    return this.api.saveRole(apiEntity).then((result) => [
      this.buildFormSubmitDoneAction(ROLE_SECTION),
      this.buildListEntityUpdateAction(ROLES_SECTION, apiEntity, result),
      this.buildRouterNavigateAction(ROUTER_PATHS.ROLES)
    ]);
  }

  @EffectsService.effects(FormActionBuilder.buildSubmitErrorActionType(ROLE_SECTION))
  public onSaveRoleError(action: IEffectsAction): IEffectsAction {
    return this.buildNotificationErrorAction(action.error);
  }
}
