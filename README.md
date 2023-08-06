
Decryption middleware for express. 

[![npm](https://img.shields.io/npm/v/@octoguild-licence/express)](https://www.npmjs.com/package/@octoguild-licence/express)

At the moment library decrypts only body from requests.

## Install

``yarn add @octoguild-licence/express``

## Usage

Code example:

```tsx
import licenceExpress from '@octoguild-licence/express'
import express from 'express'

const app = express.Router()

app.use(licenceExpress.createAccessMiddleWare())

// ... secured routes

```

