import * as React from 'react';

import {
  FormContainer,
  IFormContainerInternalProps,
  TextField,
  FormLayoutContainer,
  formMapper,
  BaseContainer,
  notificationMapper,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { AccessConfigT } from '../../permission/permission.interface';
import {
  ILoginEntity,
  LOGIN_SECTION,
} from './login.interface';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PUBLIC,
    path: ROUTER_PATHS.AUTH_LOGIN,
  },
  mappers: [
    notificationMapper,
    (state) => formMapper(state.auth.login)
  ],
})
export class LoginContainer extends BaseContainer<IFormContainerInternalProps<ILoginEntity>, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: LOGIN_SECTION,
  };

  constructor(props: IFormContainerInternalProps<ILoginEntity>) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const entity = props.form.changes as ILoginEntity;

    return (
        <FormLayoutContainer title='Log in'
                             {...props}>
          <FormContainer settings={{actionText: 'Next'}}
                         {...props}>
            <TextField name='email'
                       type='email'
                       value={entity.email}
                       label='Email'
                       autoFocus={true}
                       required={true}/>
            <TextField name='password'
                       type='password'
                       value={entity.password}
                       label='Password'
                       required={true}/>
          </FormContainer>
        </FormLayoutContainer>
    );
  }
}
