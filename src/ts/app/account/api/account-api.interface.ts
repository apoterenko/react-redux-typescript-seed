import { IAccountEntity } from '../account.interface';
import { PermissionsT } from '../../permission';

export interface IAccountApi {
  accountGet(): Promise<IAccountEntity>;
  accountRights(): Promise<PermissionsT>;
}
