# Typed jsonwebtoken
[![Build Status](https://travis-ci.org/types/npm-jsonwebtoken.svg?branch=master)](https://travis-ci.org/types/npm-jsonwebtoken)

The type definition for [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken).

## Installation

```sh
typings install --save jsonwebtoken
```

## Usage

```ts
import {sign, verify} from 'jsonwebtoken';

const token = sign({ foo: 'bar' }, 'shhhhh');

const decoded = verify(token, 'shhhhh');
```

[More examples](test/test.ts)

## License

MIT
