import * as React from 'react';

import {
  FormContainer,
  IFormContainerProps,
  TextField,
  FormLayoutContainer,
  formMapper,
  BaseContainer,
  notificationMapper,
  ContainerVisibilityTypeEnum,
  connector,
} from 'react-application-core';

import {IAppState} from '../../app.interface';
import {ROUTER_PATHS} from '../../app.routes';
import {AccessConfigT} from '../../permission';
import {
  LOGIN_SECTION,
} from './login.interface';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PUBLIC,
    path: ROUTER_PATHS.AUTH_LOGIN,
  },
  mappers: [
    notificationMapper,
    (state) => formMapper(state.auth.login)
  ],
})
export class LoginContainer extends BaseContainer<IFormContainerProps> {

  public static defaultProps: IFormContainerProps = {
    sectionName: LOGIN_SECTION,
  };

  public render(): JSX.Element {
    const props = this.props;

    return (
      <FormLayoutContainer title='Log in'
                           {...props}>
        <FormContainer formConfiguration={{actionText: 'Next', className: 'app-auth-form', actionIcon: 'done'}}
                       {...props}>
          <TextField name='login'
                     type='text'
                     label='Login'
                     autoFocus={true}
                     required={true}/>
          <TextField name='password'
                     type='password'
                     label='Password'
                     required={true}/>
        </FormContainer>
      </FormLayoutContainer>
    );
  }
}
