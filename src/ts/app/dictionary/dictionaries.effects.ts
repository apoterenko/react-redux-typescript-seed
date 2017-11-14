import { EffectsService } from 'redux-effects-promise';

import {
  provideInSingleton,
  DictionariesActionBuilder,
  BaseEffects,
} from 'react-application-core';

import { RIGHTS_DICTIONARY } from './dictionaries.interface';
import { IApi } from '../api';
import { IRightEntity } from '../permission';

@provideInSingleton(DictionariesEffects)
export class DictionariesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(DictionariesActionBuilder.buildLoadActionType(RIGHTS_DICTIONARY))
  public onLoadRightsList(): Promise<IRightEntity[]> {
    return this.api.loadRights();
  }
}
