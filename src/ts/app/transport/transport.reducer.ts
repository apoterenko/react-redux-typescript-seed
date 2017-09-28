import { AnyAction } from 'redux';

import { IKeyValue } from 'react-application-core';

import { INITIAL_TRANSPORT_STATE, ITransportState } from './transport.interface';

export function transportReducer(state: ITransportState = INITIAL_TRANSPORT_STATE,
                                 action: AnyAction): IKeyValue {
  switch (action.type) {
    case 'transport.request':
      return {
        queue: state.queue.concat(action.data.operationId),
      };
    case 'transport.request.finished':
      return {
        queue: state.queue.filter((item) => item !== action.data.operationId),
      };
  }
  return state;
}
