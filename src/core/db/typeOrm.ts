import {TypeOrmModule} from '@nestjs/typeorm';
import {SaferConfigModule, parseDotenvFile} from 'nestjs-safer-config';
import {DbConfig} from '../config/db.config';

export const TypeOrm = TypeOrmModule.forRootAsync({
  imports: [
    SaferConfigModule.register({
      createInstanceOf: DbConfig,
      sources: [parseDotenvFile(), process.env],
    }),
  ],
  inject: [DbConfig],
  useFactory: (dbConfig: DbConfig) => ({
    type: 'postgres',
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    username: dbConfig.DB_USERNAME,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_DATABASE,
    synchronize: false,
    autoLoadEntities: true,
    migrations: ['dist/db/migrations/**/*.js'],
    migrationsTableName: 'migrations_typeorm',
  }),
});
