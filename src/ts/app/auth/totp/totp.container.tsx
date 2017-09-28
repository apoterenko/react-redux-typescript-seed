import * as React from 'react';

import {
  FormContainer,
  IFormContainerInternalProps,
  BaseContainer,
  notificationMapper,
  FormLayoutContainer,
  TextField,
  Link,
  formMapper,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IAppState } from '../../app.interface';
import { ROUTER_PATHS } from '../../app.routers';
import { AccessConfigT } from '../../permission/permission.interface';
import { Spacer, Footer } from '../../component';
import {
  ITotpEntity,
  TOTP_SECTION,
} from './totp.interface';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PUBLIC,
    path: ROUTER_PATHS.AUTH_TOTP,
  },
  mappers: [
    notificationMapper,
    (state) => formMapper(state.auth.totp)
  ],
})
class TotpContainer extends BaseContainer<IFormContainerInternalProps<ITotpEntity>, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: TOTP_SECTION,
  };

  constructor(props: IFormContainerInternalProps<ITotpEntity>) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const entity = props.form.changes as ITotpEntity;

    const footer = (
        <Footer>
          <Link to={ROUTER_PATHS.HOME}>
            {this.t('Home')}
          </Link>
          <Spacer/>
          <Link to={ROUTER_PATHS.AUTH_LOGIN}>
            {this.t('Log in')}
          </Link>
        </Footer>
    );

    return (
        <FormLayoutContainer title='Authenticate'
                             footer={footer}
                             {...props}>
          <FormContainer settings={{actionText: 'Next'}}
                         {...props}>
            <TextField name='code'
                       value={entity.code}
                       type='tel'
                       label='Access code'
                       min={6}
                       max={6}
                       pattern='[0-9]{6}'
                       required
                       autoFocus/>
          </FormContainer>
        </FormLayoutContainer>
    );
  }
}
