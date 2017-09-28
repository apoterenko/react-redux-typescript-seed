import { EffectsService } from 'redux-effects-promise';

import {
  provide,
  DictionariesActionBuilder,
  BaseEffects,
} from 'react-application-core';

import { RIGHTS_DICTIONARY } from './dictionaries.interface';
import { IApi, IRight } from '../api/api.interface';

@provide(DictionariesEffects)
export class DictionariesEffects extends BaseEffects<IApi> {

  @EffectsService.effects(DictionariesActionBuilder.buildLoadActionType(RIGHTS_DICTIONARY))
  public onLoadRightsList(): Promise<IRight[]> {
    return this.api.loadRightsList();
  }
}
