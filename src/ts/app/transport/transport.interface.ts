import { IKeyValue, IOperation } from 'react-application-core';

export interface ITransport {
  authToken: string;
  request<R>(req: ITransportRequest): Promise<R>;
  cancelRequest(requestId: string): void;
}

export interface ITransportRequest {
  name: string;
  operation?: IOperation;
  params?: IKeyValue;
  useToken?: boolean;
  saveToken?: boolean;
}

export interface IRequest {
  id?: number;
  auth?: string;
  name: string;
  params?: IKeyValue;
}

export interface IRawResponse {
  data: IResponse;
}

export interface IResponse {
  id?: number;
  result?: IKeyValue|string|number|boolean;
  error?: IResponseError;
}

export interface IResponseError {
  code: number;
  message: string;
  data?: IKeyValue;
}

export interface ITransportState {
  queue: string[];
}

export const INITIAL_TRANSPORT_STATE: ITransportState = {
  queue: [],
};
