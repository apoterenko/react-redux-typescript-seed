import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  ListContainer,
  ContainerVisibilityTypeEnum,
  actionsDisabledListWrapperEntityMapper,
  connector,
  SearchFieldToolbarContainer,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routes';
import { IRolesContainerProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRoleEntity } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfiguration: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerProps> {

  public static defaultProps: IRolesContainerProps = {
    sectionName: ROLES_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;
    const header = <SearchFieldToolbarContainer filterConfiguration={actionsDisabledListWrapperEntityMapper(props)}
                                               {...props}/>;
    return (
      <DefaultLayoutContainer headerConfiguration={{ items: header }}
                              {...props}>
        <ListContainer listConfiguration={{
                        itemConfiguration: { renderer: this.renderer },
                        useAddAction: this.isPermissionAccessible(AppPermissions.ROLE_ADD),
                       }}
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
