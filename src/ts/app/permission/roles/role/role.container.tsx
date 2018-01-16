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
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IRoleContainerInternalProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { RIGHTS_DICTIONARY } from '../../../dictionary';
import { ROUTER_PATHS } from '../../../app.routers';
import { AccessConfigT } from '../../permission.interface';
import { AppPermissions } from '../../../app.permissions';

@connector<IAppState, AccessConfigT>({
  routeConfig: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: ROUTER_PATHS.ROLE,
  },
  accessConfig: [AppPermissions.ROLE_VIEW],
  mappers: [
    ...defaultMappers,
    (state) => formMapper(state.roles.role),
    (state) => listWrapperSelectedEntityMapper(state.roles, state.roles.role)
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLE_SECTION,
  };

  constructor(props: IRoleContainerInternalProps) {
    super(props);
    this.loadRights = this.loadRights.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = props.isNewEntity
      ? 'New role'
      : `Role ${this.nc.id(props.entityId)}`;

    return (
      <DefaultLayoutContainer navigationControlType='arrow_back'
                              navigationControlHandler={this.activateFormDialog}
                              title={title}
                              {...props}>
        <FormContainer {...props}>
          <TextField name='name'
                     label='Name'
                     autoFocus={true}
                     required={true}/>
          <ChipsField name='rights'
                      label='Rights'
                      options={toSelectOptions(rights)}
                      onEmptyOptions={this.loadRights}
                      useFilter={true}
                      valuesMessage='%d right(s)'/>
        </FormContainer>
        <FormDialog ref={FORM_DIALOG_REF}
                    onAccept={this.navigateToBack}
                    {...props}/>
      </DefaultLayoutContainer>
    );
  }

  private loadRights(): void {
    this.dispatchLoadDictionary(RIGHTS_DICTIONARY);
  }
}
