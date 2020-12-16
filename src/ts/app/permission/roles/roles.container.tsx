import * as React from 'react';

import {
  actionsDisabledListWrapperEntityMapper,
  connector,
  ContainerVisibilityTypesEnum,
  DefaultLayoutContainer,
  filterWrapperMapper,
  GenericContainer,
  ListContainer,
  listWrapperMapper,
  Mappers,
  SearchToolbarContainer,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routes';
import { IRolesContainerProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRoleEntity } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypesEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfiguration: [AppPermissions.ROLES_VIEW],
  mappers: [
    Mappers.storeEntity,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends GenericContainer<IRolesContainerProps> {

  public static defaultProps: IRolesContainerProps = {
    sectionName: ROLES_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;
    const header = (
      <SearchToolbarContainer
        filterConfiguration={actionsDisabledListWrapperEntityMapper(props)}
        {...props}/>
    );
    return (
      <DefaultLayoutContainer
        headerConfiguration={{items: header}}
        {...props}>
        <ListContainer
          listConfiguration={{itemConfiguration: {renderer: this.renderer}}}
          {...props}/>
      </DefaultLayoutContainer>
    );
  }

  private renderer = (item: IRoleEntity): JSX.Element => (
    <span>
       {item.name} {this.nc.id(item.id)}
    </span>
  )
}
