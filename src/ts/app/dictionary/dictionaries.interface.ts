import {
  IDictionariesDataState,
  IApplicationDictionariesState,
} from 'react-application-core';

import { IRightEntity } from '../permission';

export interface IDictionariesState extends IApplicationDictionariesState {
  rights?: IDictionariesDataState<IRightEntity>;
}

export const RIGHTS_DICTIONARY = 'rights';
