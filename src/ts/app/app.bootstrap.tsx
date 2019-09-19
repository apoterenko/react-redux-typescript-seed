import {
  bootstrap,
  appContainer,
  DI_TYPES,
  makeStore,
  DEFAULT_APPLICATION_SETTINGS,
  ISettings,
  StorageTypesEnum,
  INavigationListItemConfiguration,
} from 'react-application-core';

// Styles
import './app.bootstrap.scss';

// Modules
import 'react-application-core/module';
import 'react-application-core/core/log/log.module';
import './auth/auth.module';
import './main/main.module';
import './permission/permission.module';
import './dictionary/dictionaries.module';
import './api/api.module';
import './app.effects';

import { AppContainer } from './app.container';
import { ROUTER_PATHS } from './app.routes';
import { rolesReducers } from './permission';
import { authReducers } from './auth';
import { AppPermissions } from './app.permissions';
import { AppPermissionService } from './permission';

const applicationSettings: ISettings = {
  ...DEFAULT_APPLICATION_SETTINGS,
  companyName: 'Test Company',
  persistenceStorage: StorageTypesEnum.SESSION,
};

// Services
appContainer.rebind(DI_TYPES.Settings).toConstantValue(applicationSettings);
appContainer.rebind(DI_TYPES.Permission).to(AppPermissionService).inSingletonScope();

// Routes
appContainer.bind(DI_TYPES.Routes).toConstantValue({
  profile: ROUTER_PATHS.HOME,
  signIn: ROUTER_PATHS.AUTH_LOGIN,
  logout: ROUTER_PATHS.LOGOUT,
  home: ROUTER_PATHS.HOME,
});

// Menu
const menu: INavigationListItemConfiguration[] = [
  {label: 'Roles', icon: 'list', link: ROUTER_PATHS.ROLES, accessConfiguration: AppPermissions.ROLES_VIEW},
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
).then(() => {

    // Bootstrap app
    bootstrap(AppContainer);
});
