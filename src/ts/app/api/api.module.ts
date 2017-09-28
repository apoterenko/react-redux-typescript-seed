import { appContainer, DI_TYPES } from 'react-application-core';

import { ApiService } from './api.service';

appContainer.bind(DI_TYPES.Api).to(ApiService);
