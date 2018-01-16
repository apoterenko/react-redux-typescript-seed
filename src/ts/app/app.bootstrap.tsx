import {
  bootstrap,
  appContainer,
  DI_TYPES,
  makeStore,
  DEFAULT_APPLICATION_SETTINGS,
  IApplicationSettings,
  IRoutes,
  ApplicationStorageTypeEnum,
  INavigationListItemOptions,
} from 'react-application-core';

// Styles
import './app.bootstrap.scss';

// Modules
import 'react-application-core/module';
import './auth/auth.module';
import './main/main.module';
import './permission/permission.module';
import './dictionary/dictionaries.module';
import './api/api.module';
import './app.effects';

import { AppContainer } from './app.container';
import { ROUTER_PATHS } from './app.routers';
import { rolesReducers } from './permission';
import { authReducers } from './auth';
import { AppPermissions } from './app.permissions';
import { AppPermissionService } from './permission';

const applicationSettings: IApplicationSettings = {
  ...DEFAULT_APPLICATION_SETTINGS,
  companyName: 'Test Company',
  persistenceStorage: ApplicationStorageTypeEnum.SESSION,
};

// Services
appContainer.rebind(DI_TYPES.Settings).toConstantValue(applicationSettings);
appContainer.bind(DI_TYPES.Permission).to(AppPermissionService).inSingletonScope();

// Routes
appContainer.bind(DI_TYPES.Routes).toConstantValue({
  profile: ROUTER_PATHS.HOME,
  login: ROUTER_PATHS.AUTH_LOGIN,
  logout: ROUTER_PATHS.LOGOUT,
  home: ROUTER_PATHS.HOME,
  accessDenied: ROUTER_PATHS.ACCESS_DENIED,
} as IRoutes);

// Menu
const menu: INavigationListItemOptions[] = [
  {label: 'Roles', icon: 'list', link: ROUTER_PATHS.ROLES, accessConfig: AppPermissions.ROLES_VIEW},
  {label: 'Exit', icon: 'exit_to_app', link: ROUTER_PATHS.LOGOUT}
];
appContainer.bind(DI_TYPES.Menu).toConstantValue(menu);

// Store
makeStore(
    {
      auth: authReducers,
      roles: rolesReducers,
    },
    applicationSettings
);

// Bootstrap app
bootstrap(AppContainer);
