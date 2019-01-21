import { composeReducers } from 'react-application-core';

import {
  listReducer,
  filter,
  reducerSectionFilter,
  filterReducer,
  formReducer,
} from 'react-application-core';

import { IRolesReducersMap, ROLES_SECTION } from './roles.interface';
import { ROLE_SECTION } from './role';

export const rolesReducers = composeReducers<IRolesReducersMap>({
  list: filter(listReducer, reducerSectionFilter(ROLES_SECTION)),
  filter: filter(filterReducer, reducerSectionFilter(ROLES_SECTION)),
  role: filter(formReducer, reducerSectionFilter(ROLE_SECTION)),
});
