import { combineReducers } from 'redux';

import {
  filter,
  reducerSectionFilter,
  formReducer,
} from 'react-application-core';

import { LOGIN_SECTION } from './login/login.interface';
import { TOTP_SECTION } from './totp/totp.interface';

export const authReducers = combineReducers({
  login: filter(formReducer, reducerSectionFilter(LOGIN_SECTION)),
  totp: filter(formReducer, reducerSectionFilter(TOTP_SECTION)),
});
