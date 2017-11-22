import { IEffectsAction, EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  FormActionBuilder,
  IApiEntity,
  BaseEffects,
  makeSucceedFormEffectsProxy,
  makeFailedFormEffectsProxy,
  effectsBy,
} from 'react-application-core';

import { ROLES_SECTION } from '../roles.interface';
import { ROLE_SECTION } from './role.interface';
import { IApi } from '../../../api/api.interface';
import { IRoleEntity } from '../../permission.interface';

@provideInSingleton(RoleEffects)
@effectsBy(
    makeFailedFormEffectsProxy(ROLE_SECTION),
    makeSucceedFormEffectsProxy({
      listSection: ROLES_SECTION,
      formSection: ROLE_SECTION,
    })
)
export class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public onSaveRole(action: IEffectsAction): Promise<IRoleEntity> {
    return this.api.saveRole(action.data as IApiEntity<IRoleEntity>);
  }
}
