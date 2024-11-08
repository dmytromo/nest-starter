## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API documentation

`PORT` is .env variable, 3000 by default

### Swagger UI

Swagger UI available by `http://localhost:[PORT]/api-doc`

### OpenAPI

JSON format `http://localhost:[PORT]/api-doc-json`
YAML format `http://localhost:[PORT]/api-doc-yaml`

## Health check

Healthcheck managed by Terminus.
endpoint: `http://localhost:[PORT]/health`.

constants to indicate threshold:

```js
export const APP_ALLOCATED_MEMORY_MB = 1000;
export const APP_HEAP_MEMORY_MB = 150;
```

## DB

To access to the configured instance of typeORM, use

```bash
npm run typeorm <command>
```

In order to create migration.

```bash
npm run orm:create ./db/migrations/<migration-name>
```

Run migrations with

```bash
npm run orm:migrate
```
