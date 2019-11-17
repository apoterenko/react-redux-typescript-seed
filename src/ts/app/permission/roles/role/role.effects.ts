import {IEffectsAction, EffectsService} from 'redux-effects-promise';

import {
  BaseEffects,
  effectsBy,
  FormActionBuilder,
  makeFailedFormEffectsProxy,
  makeSucceedListFormEffectsProxy,
  provideInSingleton,
} from 'react-application-core';

import {ROLES_SECTION} from '../roles.interface';
import {ROLE_SECTION} from './role.interface';
import {IApi} from '../../../api';
import {IRoleEntity} from '../../permission.interface';

@provideInSingleton(RoleEffects)
@effectsBy(
  makeFailedFormEffectsProxy(ROLE_SECTION),
  makeSucceedListFormEffectsProxy({
    listSection: ROLES_SECTION,
    formSection: ROLE_SECTION,
  })
)
class RoleEffects extends BaseEffects<IApi> {

  @EffectsService.effects(FormActionBuilder.buildSubmitActionType(ROLE_SECTION))
  public $onSaveRole = (action: IEffectsAction): Promise<IRoleEntity> =>
    this.api.saveRole(action.data)
}
