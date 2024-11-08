import {DataSource} from 'typeorm';
import {DbConfig} from '../config/db.config';
import {instantiateAndValidate, parseDotenvFile} from 'nestjs-safer-config';

async function asyncDataSourceConfig(): Promise<DataSource> {
  const dbConfig = await instantiateAndValidate(DbConfig, [parseDotenvFile(), process.env]);
  return new DataSource({
    type: 'postgres',
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    username: dbConfig.DB_USERNAME,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_DATABASE,
    synchronize: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['db/migrations/**/*.ts'],
    migrationsTableName: 'migrations_typeorm',
  });
}

export default asyncDataSourceConfig();
