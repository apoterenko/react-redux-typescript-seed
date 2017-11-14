import * as React from 'react';

import {
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  ContainerVisibilityTypeEnum,
  connector,
} from 'react-application-core';

import { IAppState } from '../app.interface';
import { AccessConfigT } from '../permission';
import { ROUTER_PATHS } from '../app.routers';
import { AppPermissions } from '../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.HOME,
  },
  accessConfig: [AppPermissions.ROLES_VIEW],
  mappers: [
    ...defaultMappers
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
        <div className='app-center-layout app-full-layout'>
          {this.settings.companyName}
        </div>
      </DefaultLayoutContainer>
    );
  }
}
