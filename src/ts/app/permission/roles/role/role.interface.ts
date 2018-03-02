import { IFormContainerInternalProps } from 'react-application-core';

import { IRoleEntity } from '../../permission.interface';
import { IAppDictionariesWrapper } from '../../../dictionary';

export interface IRoleContainerInternalProps extends IFormContainerInternalProps<IRoleEntity>,
                                                     IAppDictionariesWrapper {
}

export const ROLE_SECTION = 'role';
