const path = require('path');
require('dotenv').config();

const ormconfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migration',
  entities: [path.resolve(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [
    path.resolve(__dirname, 'dist/src/database/migrations/**/*{.ts,.js}'),
  ],

  cli: {
    migrationsDir: path.resolve(__dirname, 'src/database/migrations'),
  },

  seeds: [path.resolve(__dirname, 'dist/src/database/seeds/**/*.js')],
  factories: [path.resolve(__dirname, 'dist/src/database/factories/**/*.js')],
};

module.exports = ormconfig;
