import {
  IDictionariesWrapper,
  IDictionaryEntity,
} from 'react-application-core';

import { IRightEntity } from '../permission';

export interface IAppDictionaries {
  rights?: IDictionaryEntity<IRightEntity>;
}

export interface IAppDictionariesWrapper extends IDictionariesWrapper<IAppDictionaries> {
}

export const RIGHTS_DICTIONARY = 'rights';
