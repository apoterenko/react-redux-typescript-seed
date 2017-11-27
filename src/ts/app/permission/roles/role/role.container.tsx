import * as React from 'react';

import {
  BaseContainer,
  FormContainer,
  FormDialog,
  TextField,
  toSelectOptions,
  listWrapperEntityMapper,
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
    (state: IAppState) => listWrapperEntityMapper(state.roles, state.roles.role)
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
    const entity = props.entity;
    const entityId = entity ? entity.id : null;
    const isNewEntity = !entityId;
    const dictionaries = props.dictionaries;
    const rights = dictionaries.rights && dictionaries.rights.data;
    const title = isNewEntity
        ? 'New role'
        : `Role ${this.nc.id(entityId)}`;

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
                        useFilter={true}/>
          </FormContainer>
          <FormDialog ref='formDialog'
                      onAccept={this.navigateToBack}
                      {...props}>
          </FormDialog>
        </DefaultLayoutContainer>
    );
  }

  private loadRights(): void {
    this.dispatchLoadDictionary(RIGHTS_DICTIONARY);
  }
}
