# Use `nestjs-safer-config` package

## Context and Problem Statement

We will write logs in the structured way. Any metadata MUST be in the log context. We need a package which works fast. It was decided before to use `pino`. That is why there is a necessity to use or create a nestjs wrapper for `pino`.

## Decision Drivers

- simple
- easy to:
  - use
  - configure
  - fork

## Considered Options

- [nestjs-pino](https://www.npmjs.com/package/nestjs-pino)
- [@zemd/nestjs-pino-logger](https://www.npmjs.com/package/@zemd/nestjs-pino-logger)
- in-house solution

## Pros and Cons of the Options

### in-house solution

- Bad, because we don't want to spend time on something that exists

### nestjs-pino

- Good, because the package do what is needed for us
- Good, because actively maintained
- Good, because source code is short and simple
- Good, because last time released 3 month ago
- Good, because has 330,038 weekly downloads
- Good, because the package comply with Nest.js recommendations

### @zemd/nestjs-pino-logger

- Good, because has good README.md (decisions explained, examples provided)
- Good, because pino-http disabled by default, but can be enabled (example in the readme)
- Bad, because LGPL-3.0 license (not clear if it is allowed to use it in commercial project)
- Bad, because has 0 to 1 weekly downloads
- Bad, because has not very clean and tidy source code

## Decision

Chosen option: "nestjs-pino" because

- of all good points from the Pros and Cons section
- I found the `nestjs-pino` earlier
- It was hard to find `@zemd/nestjs-pino-logger` on npmjs.com

### Сaveats:

1. I added the following section to the `package.json` so the version of pino used is the latest and configurable by our `package.json`:

   ```json
   {
     "overrides": {
       "nestjs-pino": {
         "pino": "$pino"
       }
     }
   }
   ```

2. A metadata must go first, a message second (this is how `pino` works):
   ```typescript
   this.logger.log({method: {name: 'getHello'}}, 'method called');
   ```

## Outcome

- allowed to remove `joi` from dependencies
- the usage of the `nestjs-safer-config` in the `typeorm.config.ts` file was not straightforward, but because TypeORM supports async config, the issue was quickly solved
