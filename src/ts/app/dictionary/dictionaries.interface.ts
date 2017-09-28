import {
  IDictionariesDataState,
  IApplicationDictionariesState,
  IEntity,
} from 'react-application-core';

import { IRight } from '../api/api.interface';

export interface IDictionariesState extends IApplicationDictionariesState {
  rights?: IDictionariesDataState<IRight>;
  priorities?: IDictionariesDataState<IEntity>;
}

export const RIGHTS_DICTIONARY = 'rights';
export const PRIORITIES_DICTIONARY = 'priorities';
