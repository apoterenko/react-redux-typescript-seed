import { combineReducers } from 'redux';

import {
  filter,
  reducerSectionFilter,
  formReducer,
} from 'react-application-core';

import { LOGIN_SECTION } from './login';
import { TOTP_SECTION } from './totp';

export const authReducers = combineReducers({
  login: filter(formReducer, reducerSectionFilter(LOGIN_SECTION)),
  totp: filter(formReducer, reducerSectionFilter(TOTP_SECTION)),
});
