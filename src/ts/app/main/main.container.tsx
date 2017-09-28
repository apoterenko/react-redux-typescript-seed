import * as React from 'react';

import {
  listWrapperMapper,
  filterWrapperMapper,
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  ContainerVisibilityTypeEnum,
  connector,
} from 'react-application-core';

import { IAppState } from '../app.interface';
import { AccessConfigT } from '../permission/permission.interface';
import { ROUTER_PATHS } from '../app.routers';
import { AppPermissions } from '../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.HOME,
  },
  accessConfig: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => filterWrapperMapper(state.roles),
    (state) => listWrapperMapper(state.roles)
  ],
})
class MainContainer extends BaseContainer<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <DefaultLayoutContainer {...props}>
        <div className='mdc-layout-grid'>
          <div className='mdc-layout-grid__inner'>
            {this.t('This is a main page')}
          </div>
        </div>
      </DefaultLayoutContainer>
    );
  }
}
