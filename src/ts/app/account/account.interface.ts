import {
  IUser,
  IPasswordable,
} from 'react-application-core';

export interface IAccountEntity extends IUser,
                                        IPasswordable {
}
