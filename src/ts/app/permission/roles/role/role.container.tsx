import * as React from 'react';

import {
  BaseContainer,
  FormContainer,
  FormDialog,
  IFormDialogInternalProps,
  TextField,
  entityMapper,
  formMapper,
  IDialog,
  DefaultLayoutContainer,
  defaultMappers,
  ChipsField,
  INITIAL_DICTIONARY_STATE,
  ContainerVisibilityTypeEnum,
  IBaseContainerInternalProps,
  connector,
} from 'react-application-core';

import { IRoleContainerInternalProps, ROLE_SECTION } from './role.interface';
import { IAppState } from '../../../app.interface';
import { PRIORITIES_DICTIONARY, RIGHTS_DICTIONARY } from '../../../dictionary/dictionaries.interface';
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
    (state: IAppState) => entityMapper(
        state.roles.list ? state.roles.list.selected : null,
        state.roles.role
    )
  ],
})
class RoleContainer extends BaseContainer<IRoleContainerInternalProps, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ROLE_SECTION,
  };

  constructor(props: IRoleContainerInternalProps) {
    super(props);
    this.loadRights = this.loadRights.bind(this);
    this.loadPriorities = this.loadPriorities.bind(this);
    this.navigationControlHandler = this.navigationControlHandler.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const entity = this.isRouteParamIdEqualNewOption ? props.form.changes : props.entity;
    const rights = props.dictionaries.rights || INITIAL_DICTIONARY_STATE;
    const title = this.isRouteParamIdEqualNewOption
        ? 'New role'
        : `Role ${entity.id}`;

    return (
        <DefaultLayoutContainer navigationControlType='arrow_back'
                                navigationControlHandler={this.navigationControlHandler}
                                title={title}
                                {...props}>
          <FormContainer {...props}>
            <TextField name='name'
                       value={entity.name}
                       label='Name'
                       required/>
            <ChipsField name='rights'
                        label='Right'
                        options={
                          rights.data
                              ? rights.data.map((right) => ({ value: right.id, label: right.name }))
                              : null
                        }
                        value={entity.rights}
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

  private loadPriorities(): void {
    this.dispatchLoadDictionary(PRIORITIES_DICTIONARY);
  }

  private loadRights(): void {
    this.dispatchLoadDictionary(RIGHTS_DICTIONARY);
  }

  private navigationControlHandler(): void {
    (this.refs.formDialog as IDialog<IFormDialogInternalProps>).activate();
  }
}
