import { combineReducers } from 'redux';

import {
  filter,
  reducerSectionFilter,
  formReducer,
} from 'react-application-core';

import { LOGIN_SECTION } from './login';
import { SMS_SECTION } from './sms';

export const authReducers = combineReducers({
  login: filter(formReducer, reducerSectionFilter(LOGIN_SECTION)),
  sms: filter(formReducer, reducerSectionFilter(SMS_SECTION)),
});
