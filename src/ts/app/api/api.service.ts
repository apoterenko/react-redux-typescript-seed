import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
  IApiEntity,
  IKeyValue,
} from 'react-application-core';

import { toActualSnapshot } from '../util/field';
import { PermissionsT } from '../permission';
import { ILoginEntity } from '../auth';
import { IActionBasicRequest, IApi, IRight, IRole, IUser } from './api.interface';
import { ITransport } from '../transport/transport.interface';

@injectable()
export class ApiService implements IApi {

  @lazyInject(DI_TYPES.Transport) private transport: ITransport;

  public accountGet(): Promise<IUser> {
    return this.transport.request<IUser>({ name: 'account.get' });
  }

  public accountRights(): Promise<PermissionsT> {
    return this.transport.request<PermissionsT>({ name: 'account.rights' });
  }

  public authAccount(apiEntity: IApiEntity<ILoginEntity>): Promise<string> {
    return this.transport.request<string>({
      name: 'auth.account',
      saveToken: true,
      params: apiEntity.entity,
      operation: apiEntity.operation,
    });
  }

  public authNonce(request: IApiEntity<IKeyValue>): Promise<string> {
    return this.transport.request<string>({
      name: 'auth.nonce',
      params: {
        nonce: this.transport.authToken,
      },
      useToken: false,
      saveToken: true,
    });
  }

  public saveRole(request: IApiEntity<IRole>): Promise<boolean> {
    const isNew = !request.isIdExist;
    const params = {
      ...request.changes,
    };
    const rights = toActualSnapshot(params.rights);
    if (rights) {
      params.rights = rights;
    }
    return this.transport.request<boolean>({
      name: isNew ? 'role.add' : 'role.edit',
      params,
    });
  }

  public searchRoles(request: IActionBasicRequest<string>): Promise<IRole[]> {
    return this.transport.request<IRole[]>({
      name: 'role.list',
      params: {
        name: request.query,
      },
    });
  }

  public loadRightsList(): Promise<IRight[]> {
    return this.transport.request<IRight[]>({
      name: 'right.list',
    });
  }
}
