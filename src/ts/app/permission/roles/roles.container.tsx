import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  SearchToolbarContainer,
  ListContainer,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { ROUTER_PATHS } from '../../app.routers';
import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT, IRoleEntity } from '../permission.interface';
import { AppPermissions } from '../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLES,
  },
  accessConfig: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class RolesContainer extends BaseContainer<IRolesContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLES_SECTION,
  };

  constructor(props: IRolesContainerInternalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <DefaultLayoutContainer {...props}
                                navigationControls={<SearchToolbarContainer {...props}/>}>
          <ListContainer listOptions={{
                           itemOptions: { renderer: this.itemRenderer },
                           addAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                         }}
                         {...props}/>
        </DefaultLayoutContainer>
    );
  }

  private itemRenderer = (item: IRoleEntity) => (
     <span>
        {item.name || item.id}
     </span>
  )
}
