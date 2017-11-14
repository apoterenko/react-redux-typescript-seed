import { IFormContainerInternalProps } from 'react-application-core';

import { IRoleEntity } from '../../permission.interface';

export interface IRoleContainerInternalProps extends IFormContainerInternalProps<IRoleEntity> {
}

export const ROLE_SECTION = 'role';
