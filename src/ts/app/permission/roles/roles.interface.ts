import { Reducer } from 'redux';

import {
  IEditableEntity,
  IFilteredListWrapperEntity,
  IListEntity,
  IQueryFilterEntity,
  IQueryFilteredListEntity,
  IContainerProps,
} from 'react-application-core';

export interface IRoleWrapper<TRole> {
  role?: TRole;
}

export interface IRolesWrapper<TRoles> {
  roles?: TRoles;
}

export interface IRolesDefinition<TFilter, TList, TRole> extends IFilteredListWrapperEntity<TFilter, TList>,
                                                                 IRoleWrapper<TRole> {
}

export interface IRolesContainerProps extends IContainerProps,
                                              IQueryFilteredListEntity {
}

export interface IRolesStateWrapper extends IRolesWrapper<IRolesDefinition<IQueryFilterEntity,
                                                          IListEntity,
                                                          IEditableEntity>> {
}

export interface IRolesReducersMap extends IRolesDefinition<Reducer<{}>,
                                                            Reducer<{}>,
                                                            Reducer<{}>> {
}

export const ROLES_SECTION = 'roles';
