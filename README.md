<p align="center">
  <img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/node-common.svg">
</p>

# 
[![Build Status](https://travis-ci.com/TheSoftwareHouse/node-common.svg?branch=master)](https://travis-ci.com/github/TheSoftwareHouse/node-common)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-4dc71f.svg)](https://lerna.js.org/)

node-common are set of useful tools for developing Node.js applications.

## Monorepo

This repo is a monorepo which contains the libs:

- [Command Bus](https://github.com/TheSoftwareHouse/node-common/tree/master/packages/command-bus)

## Setting up for local development

- Clone the repo
- From your workspace root run `npm install`, then `npm run bootstrap` and `npm run build`
- `npm run integration` - run integration tests in each package
- `npm run add -- <dependency> [--scope=<package-name>]` - add `<depencency>` to `packages/package-name`. If `scope` flag is ommited it adds `dependency` to all packages.
- `npm run format` - run code formatter
- `npm run lint` - run linter analysis 
- `npm run watch` - build packages and watch for changes

## License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).

## About us:

<a href="https://tsh.io"><b>The Software House</b></a>

<img src="https://raw.githubusercontent.com/TheSoftwareHouse/node-common/master/assets/tsh.png" alt="tsh.png" width="150"  />  

