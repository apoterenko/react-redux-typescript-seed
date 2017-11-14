import { IPasswordable, ILoginable } from 'react-application-core';

export interface ILoginEntity extends IPasswordable,
                                      ILoginable {
}

export const LOGIN_SECTION = 'login';
