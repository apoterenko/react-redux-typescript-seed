import {
  appContainer,
  bindInSingleton,
  bootstrapReactApp,
  bootstrapWebApp,
  buildUniversalStore,
  DEFAULT_APPLICATION_SETTINGS,
  DEFAULT_BOOTSTRAP_ENTITY,
  DI_TYPES,
  INavigationListItemConfiguration,
  ISettings,
  StorageTypesEnum,
} from 'react-application-core';

// Styles
import './app.bootstrap.scss';

/**
 * Core modules
 */
import 'react-application-core/module';
import 'react-application-core/core/log/log.module';
import 'react-application-core/core/transport/request/data-factory/json-rpc/transport-json-rpc-request-data-factory.module';

/**
 * App modules
 */
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
bindInSingleton(DI_TYPES.Permission, AppPermissionService);

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
buildUniversalStore({
    auth: authReducers,
    roles: rolesReducers,
  },
  applicationSettings
).then(() => bootstrapWebApp(() => bootstrapReactApp(AppContainer, {
  ...DEFAULT_BOOTSTRAP_ENTITY,
  flexEnabled: true,
})));
