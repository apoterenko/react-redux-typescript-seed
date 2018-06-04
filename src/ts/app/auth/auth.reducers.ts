import { combineReducers } from 'redux';

import {
  filter,
  reducerSectionFilter,
  formReducer,
} from 'react-application-core';

import { LOGIN_SECTION } from './login';

export const authReducers = combineReducers({
  login: filter(formReducer, reducerSectionFilter(LOGIN_SECTION)),
});
