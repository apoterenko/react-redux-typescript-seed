import * as React from 'react';

import {
  defaultMappers,
  BaseContainer,
  DefaultLayoutContainer,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IAppState } from '../app.interface';
import { AccessConfigT } from '../permission';
import { ROUTER_PATHS } from '../app.routers';
import { MAIN_SECTION } from './main.interface';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.HOME,
  },
  mappers: [
    ...defaultMappers
  ],
})
class MainContainer extends BaseContainer<IBaseContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: MAIN_SECTION,
  };

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
