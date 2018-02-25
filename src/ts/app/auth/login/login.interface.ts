import { ILoginWrapper, IPasswordWrapper } from 'react-application-core';

export interface ILoginEntity extends IPasswordWrapper,
                                      ILoginWrapper {
}

export const LOGIN_SECTION = 'login';
