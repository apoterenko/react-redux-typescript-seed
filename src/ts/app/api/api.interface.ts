import { IAuthApi } from '../auth';
import { IPermissionApi } from '../permission/api/permission-api.interface';

export interface IApi extends IAuthApi,
                              IPermissionApi {
}
