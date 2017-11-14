import { IAuthApi } from '../auth';
import { IPermissionApi } from '../permission';
import { IAccountApi } from '../account';

export interface IApi extends IAuthApi,
                              IPermissionApi,
                              IAccountApi {
}
