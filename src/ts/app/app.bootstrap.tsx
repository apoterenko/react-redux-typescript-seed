import { LoggerFactory } from 'ts-smart-logger';

import {
  bootstrap,
  appContainer,
  DI_TYPES,
  makeStore,
  DEFAULT_APPLICATION_SETTINGS,
  IRouters,
  INavigationListItem,
} from 'react-application-core';

// Styles
import '../../css/app.scss';

// Modules
import 'react-application-core/module';
import './auth/auth.module';
import './main/main.module';
import './permission/permission.module';
import './dictionary/dictionaries.module';
import './api/api.module';

import { AppContainer } from './app.container';
import { ROUTER_PATHS } from './app.routers';
import { PermissionService } from './permission/permission.service';
import { TransportService } from './transport/transport.service';
import { transportReducer } from './transport/transport.reducer';
import { rolesReducers } from './permission';
import { authReducers } from './auth';
import { AppPermissions } from './app.permissions';

const applicationSettings = {
  ...DEFAULT_APPLICATION_SETTINGS,
};

// Services
appContainer.bind(DI_TYPES.Transport).to(TransportService);
appContainer.bind(DI_TYPES.Permission).to(PermissionService);
appContainer.bind(DI_TYPES.Translate).toConstantValue((k) => k);
appContainer.bind(DI_TYPES.Settings).toConstantValue(applicationSettings);
appContainer.bind(DI_TYPES.Company).toConstantValue('Test company');

// Routers
appContainer.bind(DI_TYPES.Routers).toConstantValue({
  profile: ROUTER_PATHS.HOME,
  login: ROUTER_PATHS.AUTH_LOGIN,
  home: ROUTER_PATHS.HOME,
} as IRouters);

// Menu
const menu: INavigationListItem[] = [
  {text: 'Roles', icon: 'list', link: ROUTER_PATHS.ROLES, accessConfig: AppPermissions.ROLES_VIEW},
  {text: 'Exit', icon: 'exit_to_app', link: ROUTER_PATHS.LOGOUT}
];
appContainer.bind(DI_TYPES.Menu).toConstantValue(menu);

// Store
makeStore(
    {
      auth: authReducers,
      roles: rolesReducers,
      transport: transportReducer,
    },
    applicationSettings
);

// Configuring of external modules
LoggerFactory.configure();

// Bootstrap app
bootstrap(AppContainer);
