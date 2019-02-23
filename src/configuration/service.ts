import * as nconf from 'nconf';

export class ConfigurationService {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';

    nconf
    .argv()
    .env({ separator: '_', lowerCase: true })
    .file(environment, 'config/' + environment + '.json')
    .file('default', 'config/default.json');
  }

  get(key: string): any {
    return nconf.get(key);
  }
}

export default ConfigurationService;
