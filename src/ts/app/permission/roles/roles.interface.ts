import { Reducer } from 'redux';

import {
  IListWrapper,
  IQueryFilterWrapper,
  IContainerProps, IReduxQueryFilterEntity, IReduxListEntity,
} from 'react-application-core';

export interface IRoleWrapper<TRole> {
  role?: TRole;
}

export interface IRolesWrapper<TRoles> {
  roles?: TRoles;
}

export interface IRolesDefinition<TFilter, TList, TRole> extends IListWrapper<TList>,
                                                                 IQueryFilterWrapper<TFilter>,
                                                                 IRoleWrapper<TRole> {
}

export interface IRolesContainerProps extends IContainerProps,
                                              any {
}

export interface IRolesStateWrapper extends IRolesWrapper<IRolesDefinition<IReduxQueryFilterEntity,
                                                          IReduxListEntity,
                                                          any>> {
}

export interface IRolesReducersMap extends IRolesDefinition<Reducer<{}>,
                                                            Reducer<{}>,
                                                            Reducer<{}>> {
}

export const ROLES_SECTION = 'roles';
