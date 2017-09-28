import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  SearchToolbarContainer,
  ListContainer,
  IListContainer,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IRole } from '../../api';
import { ROUTER_PATHS } from '../../app.routers';
import { IRolesContainerInternalProps, ROLES_SECTION } from './roles.interface';
import { IAppState } from '../../app.interface';
import { AccessConfigT } from '../permission.interface';
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
    this.onSearch = this.onSearch.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <DefaultLayoutContainer {...props}>
          <SearchToolbarContainer onSearch={this.onSearch}
                                  {...props}/>
          <ListContainer listOptions={{
                            renderer: this.listRenderer,
                            addAction: this.permissionService.isAccessible(AppPermissions.ROLE_ADD),
                         }}
                         ref='list'
                         {...props}/>
        </DefaultLayoutContainer>
    );
  }

  private onSearch(value: string): void {
    (this.refs.list as IListContainer).load(value);
  }

  private listRenderer = (item: IRole) => (
     <span>
        {item.name || item.id}
     </span>
  )
}
