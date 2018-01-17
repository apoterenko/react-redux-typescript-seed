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
import { ROUTER_PATHS } from '../../app.routes';
import { AccessConfigT } from '../../permission';
import { Spacer, Footer } from '../../component';
import { SMS_SECTION, ISmsEntity } from './sms.interface';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PUBLIC,
    path: ROUTER_PATHS.AUTH_SMS,
  },
  mappers: [
    notificationMapper,
    (state) => formMapper(state.auth.sms)
  ],
})
class SmsContainer extends BaseContainer<IFormContainerInternalProps<ISmsEntity>, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: SMS_SECTION,
  };

  constructor(props: IFormContainerInternalProps<ISmsEntity>) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const changes = props.form.changes;

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
          <FormContainer formOptions={{actionText: 'Next', className: 'app-auth-form'}}
                         {...props}>
            <TextField name='value'
                       value={changes.value}
                       label='PIN from SMS'
                       minLength={4}
                       maxLength={4}
                       pattern='[0-9]{4}'
                       required={true}
                       autoFocus={true}/>
          </FormContainer>
        </FormLayoutContainer>
    );
  }
}
