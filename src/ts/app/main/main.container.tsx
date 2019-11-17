import * as React from 'react';

import {
  BaseContainer,
  connector,
  ContainerVisibilityTypesEnum,
  DefaultLayoutContainer,
  defaultMappers,
  IContainerProps,
} from 'react-application-core';

import { IAppState } from '../app.interface';
import { AccessConfigT } from '../permission';
import { ROUTER_PATHS } from '../app.routes';
import { MAIN_SECTION } from './main.interface';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypesEnum.PRIVATE,
    path: ROUTER_PATHS.HOME,
  },
  mappers: [
    ...defaultMappers
  ],
})
class MainContainer extends BaseContainer {

  public static readonly defaultProps: IContainerProps = {
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
