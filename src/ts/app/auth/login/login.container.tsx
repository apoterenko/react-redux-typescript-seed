import * as React from 'react';

import {
  BaseContainer,
  connector,
  ContainerVisibilityTypesEnum,
  FormContainer,
  FormLayoutContainer,
  formMapper,
  IFormContainerProps,
  notificationMapper,
  TextField,
} from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ROUTER_PATHS } from '../../app.routes';
import { AccessConfigT } from '../../permission';
import {
  LOGIN_SECTION,
} from './login.interface';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypesEnum.PUBLIC,
    path: ROUTER_PATHS.AUTH_LOGIN,
  },
  mappers: [
    notificationMapper,
    (state) => formMapper(state.auth.login)
  ],
})
export class LoginContainer extends BaseContainer<IFormContainerProps> {

  public static readonly defaultProps: IFormContainerProps = {
    sectionName: LOGIN_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;

    return (
      <FormLayoutContainer
        title='Log in'
        {...props}>
        <FormContainer
          formConfiguration={{
            className: 'app-auth-form',
            submitIcon: 'done',
            submitText: 'Next',
          }}
          {...props}>
          <TextField
            name='login'
            type='text'
            label='Login'
            autoFocus={true}
            required={true}/>
          <TextField
            name='password'
            type='password'
            label='Password'
            required={true}/>
        </FormContainer>
      </FormLayoutContainer>
    );
  }
}
