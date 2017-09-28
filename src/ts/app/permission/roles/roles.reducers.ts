import { combineReducers } from 'redux';

import {
  listReducer,
  filter,
  reducerSectionFilter,
  filterReducer,
  formReducer,
} from 'react-application-core';

import { ROLES_SECTION } from './roles.interface';
import { ROLE_SECTION } from './role/role.interface';

export const rolesReducers = combineReducers({
  list: filter(listReducer, reducerSectionFilter(ROLES_SECTION)),
  filter: filter(filterReducer, reducerSectionFilter(ROLES_SECTION)),
  role: filter(formReducer, reducerSectionFilter(ROLE_SECTION)),
});
