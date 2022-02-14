import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const ormconfig = require('../../ormconfig');

export default () => {
  let config: TypeOrmModuleOptions = {
    ...ormconfig,
    autoLoadEntities: true,
  };

  return config;
};
