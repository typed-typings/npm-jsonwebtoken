# Typed jsonwebtoken

[![Greenkeeper badge](https://badges.greenkeeper.io/types/npm-jsonwebtoken.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/types/npm-jsonwebtoken.svg?branch=master)](https://travis-ci.org/types/npm-jsonwebtoken)

The type definition for [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken).

## Installation

```sh
typings install --save jsonwebtoken
```

## Usage

```ts
import {sign, verify, TokenExpiredError} from 'jsonwebtoken';

const token = sign({ foo: 'bar' }, 'shhhhh');

try {
    const decoded = verify(token, 'shhhhh');
} catch (err) {
    if (err instanceof TokenExpiredError) {
        // do something
    }
}
```

[More examples](test/test.ts)

## License

MIT
