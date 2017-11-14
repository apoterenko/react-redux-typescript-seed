import {
  bootstrap,
  appContainer,
  DI_TYPES,
  makeStore,
  DEFAULT_APPLICATION_SETTINGS,
  IApplicationSettings,
  IRoutes,
  INavigationListItem,
  ApplicationStorageTypeEnum,
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
appContainer.unbind(DI_TYPES.Settings);
appContainer.bind(DI_TYPES.Settings).toConstantValue(applicationSettings);
appContainer.bind(DI_TYPES.Permission).to(AppPermissionService).inSingletonScope();
appContainer.bind(DI_TYPES.Translate).toConstantValue((k) => k);

// Routes
appContainer.bind(DI_TYPES.Routes).toConstantValue({
  profile: ROUTER_PATHS.HOME,
  login: ROUTER_PATHS.AUTH_LOGIN,
  logout: ROUTER_PATHS.LOGOUT,
  home: ROUTER_PATHS.HOME,
} as IRoutes);

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
    },
    applicationSettings
);

// Bootstrap app
bootstrap(AppContainer);
