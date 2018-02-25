import {
  IUser,
  IPasswordWrapper,
} from 'react-application-core';

export interface IAccountEntity extends IUser,
                                        IPasswordWrapper {
}
