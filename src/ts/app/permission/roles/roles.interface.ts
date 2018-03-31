import {
  IBaseContainerInternalProps,
  IApplicationFormState,
  IListWrapperEntity,
  IApplicationFilterWrapperState,
} from 'react-application-core';

export interface IRolesContainerInternalProps extends IBaseContainerInternalProps,
                                                      IListWrapperEntity,
                                                      IApplicationFilterWrapperState {
}

export interface IRolesState extends IListWrapperEntity,
                                     IApplicationFilterWrapperState {
  role: IApplicationFormState;
}

export const ROLES_SECTION = 'roles';
