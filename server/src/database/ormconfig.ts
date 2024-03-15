import * as path from 'path';

import 'dotenv/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';

export const getDataSourceConfig = (logger?: PinoLogger): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME_DEVELOPMENT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: (sql, timing) => logger.info(sql, typeof timing === 'number' ? `Elapsed time: ${timing}ms` : ''),
  modelPaths: [path.join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
  autoLoadModels: true,
  // synchronize: true, //! Migrations
});
