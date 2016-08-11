
import {sign, verify, JsonWebTokenError, NotBeforeError, TokenExpiredError} from 'jsonwebtoken';
import * as fs from 'fs';

// sign with default (HMAC SHA256)
let token = sign({ foo: 'bar' }, 'shhhhh');

// backdate a jwt 30 seconds
sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// sign with RSA SHA256
let cert = fs.readFileSync('private.key');  // get private key
token = sign({ foo: 'bar' }, cert, { algorithm: 'RS256' });

// sign asynchronously
sign({ foo: 'bar' }, cert, { algorithm: 'RS256' }, (err, token) => {
    console.log(token);
});

// verify a token symmetric - synchronous
const decoded = verify(token, 'shhhhh');
console.log(decoded.foo); // bar

// verify a token symmetric
verify(token, 'shhhhh', (err, decoded) => {
    console.log(decoded.foo); // bar
});

// invalid token - synchronous
try {
    const payload = verify(token, 'wrong-secret');
    console.log(payload);
} catch (err) {
    if (err instanceof JsonWebTokenError) {
        console.log(err.name);
        if (err instanceof NotBeforeError) {
            console.log(err.date);
        } else if (err instanceof TokenExpiredError) {
            console.log(err.expiredAt);
        }
    }
}

// invalid token
verify(token, 'wrong-secret', (err, decoded) => {
    // err
    // decoded undefined
});

// verify a token asymmetric
cert = fs.readFileSync('public.pem');  // get public key
verify(token, cert, (err, decoded) => {
    console.log(decoded.foo); // bar
});

// verify audience
cert = fs.readFileSync('public.pem');  // get public key
verify(token, cert, { audience: 'urn:foo' }, (err, decoded) => {
    // if audience mismatch, err == invalid audience
});

// verify issuer
cert = fs.readFileSync('public.pem');  // get public key
verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer' }, (err, decoded) => {
    // if issuer mismatch, err == invalid issuer
});

// verify jwt id
cert = fs.readFileSync('public.pem');  // get public key
verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid' }, (err, decoded) => {
    // if jwt id mismatch, err == invalid jwt id
});

// verify subject
cert = fs.readFileSync('public.pem');  // get public key
verify(token, cert, { audience: 'urn:foo', issuer: 'urn:issuer', jwtid: 'jwtid', subject: 'subject' }, (err, decoded) => {
    // if subject mismatch, err == invalid subject
});

// alg mismatch
cert = fs.readFileSync('public.pem'); // get public key
verify(token, cert, { algorithms: ['RS256'] }, (err, payload) => {
    // if token alg != RS256,  err == invalid signature
});
