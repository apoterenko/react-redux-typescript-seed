import * as React from 'react';

import {
  BaseContainer,
  FormContainer,
  FormDialog,
  TextField,
  toSelectOptions,
  FORM_DIALOG_REF,
  listWrapperSelectedEntityMapper,
  formMapper,
  DefaultLayoutContainer,
  defaultMappers,
  ChipsField,
  ContainerVisibilityTypeEnum,
  connector,
  ReactLayoutBuilder,
  LayoutBuilderTypeEnum,
} from 'react-application-core';

import { IRoleContainerProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { RIGHTS_DICTIONARY } from '../../../dictionary';
import { ROUTER_PATHS } from '../../../app.routes';
import { AccessConfigT } from '../../permission.interface';
import { AppPermissions } from '../../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLE,
  },
  accessConfiguration: [AppPermissions.ROLE_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => formMapper(state.roles.role),
    (state) => listWrapperSelectedEntityMapper(state.roles, state.roles.role)
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerProps> {

  public static defaultProps: IRoleContainerProps = {
    sectionName: ROLE_SECTION,
  };

  private readonly layoutBuilder = new ReactLayoutBuilder();

  public render(): JSX.Element {
    const props = this.props;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = props.newEntity
      ? 'New role'
      : `Role ${this.nc.id(props.entityId)}`;

    return (
      <DefaultLayoutContainer headerConfiguration={{
                                navigationActionType: 'arrow_back',
                                onNavigationActionClick: this.activateFormDialog,
                              }}
                              title={title}
                              {...props}>
        <FormContainer {...props}>
          {
            this.layoutBuilder.build({
              layout: LayoutBuilderTypeEnum.VERTICAL,
              children: [
                <TextField name='name'
                           label='Name'
                           autoFocus={true}
                           required={true}/>,
                <ChipsField name='rights'
                            label='Rights'
                            options={toSelectOptions(rights)}
                            bindDictionary={RIGHTS_DICTIONARY}
                            menuConfiguration={{ useFilter: true, renderToCenterOfBody: true }}
                            displayMessage='%d right(s)'/>
              ],
            })
          }
        </FormContainer>
        <FormDialog ref={FORM_DIALOG_REF}
                    onAccept={this.navigateToBack}
                    {...props}/>
      </DefaultLayoutContainer>
    );
  }
}
