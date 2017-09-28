import { IFormContainerInternalProps } from 'react-application-core';

import { IRole } from '../../../api/api.interface';

export interface IRoleContainerInternalProps extends IFormContainerInternalProps<IRole> {
}

export const ROLE_SECTION = 'role';
