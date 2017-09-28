import {
  INITIAL_APPLICATION_LIST_STATE,
  IBaseContainerInternalProps,
  INITIAL_APPLICATION_FORM_STATE,
  IApplicationFormState,
  INITIAL_APPLICATION_FILTER_STATE,
  IApplicationListWrapperState,
  IApplicationFilterWrapperState,
} from 'react-application-core';

export interface IRolesContainerInternalProps extends IBaseContainerInternalProps,
                                                      IApplicationListWrapperState,
                                                      IApplicationFilterWrapperState {
}

export interface IRolesState extends IApplicationListWrapperState,
                                     IApplicationFilterWrapperState {
  role: IApplicationFormState;
}

export const INITIAL_ROLES_STATE: IRolesState = {
  role: INITIAL_APPLICATION_FORM_STATE,
  list: INITIAL_APPLICATION_LIST_STATE,
  filter: INITIAL_APPLICATION_FILTER_STATE,
};

export const ROLES_SECTION = 'roles';
