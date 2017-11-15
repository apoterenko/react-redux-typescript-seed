import {
  IBaseContainerInternalProps,
  IApplicationFormState,
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

export const ROLES_SECTION = 'roles';
