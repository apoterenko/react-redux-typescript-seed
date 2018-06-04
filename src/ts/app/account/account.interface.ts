import {
  IUserEntity,
  IPasswordWrapper,
} from 'react-application-core';

export interface IAccountEntity extends IUserEntity,
                                        IPasswordWrapper {
}
