import { IFormContainerProps } from 'react-application-core';

import { IRoleEntity } from '../../permission.interface';
import { IAppDictionaries } from '../../../dictionary';

export interface IRoleContainerProps
  extends IFormContainerProps<IRoleEntity, IAppDictionaries> {
}

export const ROLE_SECTION = 'role';
