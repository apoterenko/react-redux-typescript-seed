import { IFormContainerProps } from 'react-application-core';

import { IRoleEntity } from '../../permission.interface';
import { IAppDictionariesWrapper } from '../../../dictionary';

export interface IRoleContainerProps extends IFormContainerProps<IRoleEntity>,
                                             IAppDictionariesWrapper {
}

export const ROLE_SECTION = 'role';
