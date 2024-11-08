# Use `nestjs-safer-config` package

## Context and Problem Statement

We see necessity to use a better package then default `@nestjs/config`.

## Decision Drivers

- we want type safety
- we don't want to use generics
- out of the box validation
- verboseness
- easy to read source code
- number of dependencies

## Considered Options

- [nestjs-safe-config](https://www.npmjs.com/package/nestjs-safe-config)
- [nestjs-safer-config](https://www.npmjs.com/package/nestjs-safer-config)
- [nest-typed-config](https://www.npmjs.com/package/nest-typed-config)

## Pros and Cons of the Options

### nestjs-safer-config

- Good, because has all we need
- Good, because actively maintained
- Good, because convenient API
- Good, because no 3rd-party dependencies
- Good, because small, easy to read source-code

### nestjs-safe-config

- Bad, because not compatible with latest nestjs
- Bad, because has 'rxjs' as dependency
- Bad, because last published 3 years ago

### nest-typed-config

- Good, because has all we need
- Good, because actively maintained
- Good, because convenient API
- Bad, because too many 3rd-party dependencies
- Bad, because bloated source-code

## Decision

Chosen option: "nestjs-safer-config"
