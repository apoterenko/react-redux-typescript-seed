import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provide,
  FormActionBuilder,
  IApiEntity,
  ListActionBuilder,
  BaseEffects,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../../app.routers';
import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi, IRole } from '../../../api/api.interface';

@provide(RoleEffects)
export class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IEffectsAction[]> {
    const apiPayload = action.data as IApiEntity<IRole>;

    return this.api.saveRole(apiPayload)
        .then((_) => ([
          this.buildFormSubmitDoneAction(ROLE_SECTION),
          apiPayload.isIdExist
              ? ListActionBuilder.buildUpdateAction(ROLES_SECTION, {
                payload: {
                  id: apiPayload.id,
                  changes: apiPayload.changes,  // Pass the server side entity
                },
                section: ROLES_SECTION,
              })
              : ListActionBuilder.buildInsertAction(ROLES_SECTION, {
                payload: {
                  id: apiPayload.id,
                  changes: apiPayload.changes,  // Pass the server side entity
                },
                section: ROLES_SECTION,
              }),
          this.buildRouterNavigateAction(ROUTER_PATHS.ROLES)
        ]));
  }
}
