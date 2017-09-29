import Axios from 'axios/dist/axios';
import { injectable } from 'inversify';
import { Store } from 'redux';
import { DI_TYPES, IStorage, lazyInject } from 'react-application-core';

import { IAppState } from '../app.interface';
import { IRawResponse, IRequest, ITransport, ITransportRequest } from './transport.interface';

@injectable()
export class TransportService implements ITransport {

  private static API_URL = '/api';
  private static AUTH_TOKEN = 'auth.token';

  private requestsMap = new Map<string, Axios.CancelTokenSource>();
  @lazyInject(DI_TYPES.Storage) private storage: IStorage;
  @lazyInject(DI_TYPES.Store) private store: Store<IAppState>;

  public request<R>(req: ITransportRequest): Promise<R> {
    let source;
    const authToken = this.authToken;
    const request: IRequest = {
      name: req.name,
    };
    if (req.params) {
      request.params = req.params;
    }
    if (req.useToken !== false && authToken) {
      request.auth = authToken;
    }
    if (req.operation) {
      const cancelToken = Axios.CancelToken;
      source = cancelToken.source();
      this.requestsMap.set(req.operation.id, source);
      this.store.dispatch({ type: 'transport.request', data: { operationId: req.operation.id }});
    }

    return new Promise((resolve, reject) => {
      Axios.request({
        url: TransportService.API_URL + '?_dc=' + Date.now(),
        method: 'POST',
        data: request,
        ...(source ? { cancelToken: source.token } : {}),
      }).then((response: IRawResponse) => {
        if (req.operation) {
          this.store.dispatch({
            type: 'transport.request.finished',
            data: { operationId: req.operation.id },
          });
        }
        if (response.data.error) {
          reject(response.data.error);
        } else {
          if (req.saveToken) {
            const token = response.data.result[0];
            this.storage.set(TransportService.AUTH_TOKEN, token);
            resolve(token);
            return;
          } else {
            resolve(response.data.result as R);
          }
        }
      }, (e: Error|string) => {
        if (req.operation) {
          this.store.dispatch({
            type: 'transport.request.finished',
            data: { operationId: req.operation.id },
          });
        }
        reject(e);
      });
    });
  }

  public get authToken(): string {
    return this.storage.get(TransportService.AUTH_TOKEN);
  }
}
