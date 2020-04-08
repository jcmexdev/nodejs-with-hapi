'use strict';
const Hapi = require('@hapi/hapi');
const hapiDevErrors = require('hapi-dev-errors');
const scooter = require('@hapi/scooter');
const blankie = require('blankie');
const crumb = require('crumb');
const handlebars = require('./lib/helpers');
const inert = require('@hapi/inert');
const good = require('@hapi/good');
const goodConsole = require('@hapi/good-console');
const methods = require('./lib/methods');
const path = require('path');
const vision = require('@hapi/vision');
const routes = require('./routes');
const { config } = require('./config/index');
const site = require('./controllers/site');

const server = Hapi.server({
  port: config.port,
  host: config.host,
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public'),
    },
  },
});

async function init() {
  try {
    await server.register(inert);
    await server.register(vision);
    await server.register({
      plugin: good,
      options: {
        reporters: {
          myConsoleReporters: [
            {
              module: goodConsole,
            },
            'stdout',
          ],
        },
      },
    });
    await server.register({
      plugin: crumb,
      options: {
        cookieOptions: {
          isSecure: config.appEnv === 'prod',
        },
      },
    });

    await server.register([
      scooter,
      {
        plugin: blankie,
        options: {
          defaultSrc: `'self' 'unsafe-inline'`,
          styleSrc: `'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com`,
          fontSrc: `'self' 'unsafe-inline' data:`,
          scriptSrc: `'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com/ https://code.jquery.com/`,
          generateNonces: false,
        },
      },
    ]);

    await server.register({
      plugin: hapiDevErrors,
      options: {
        showErrors: config.appEnv !== 'prod',
      },
    });

    await server.register(require('./lib/api'));

    server.method('setAnswerRight', methods.setAnswerRight);
    server.method('getLast', methods.getLast, {
      cache: {
        expiresIn: 1000 * 60,
        generateTimeout: 2000,
      },
    });

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: config.appEnv === 'prod',
      encoding: 'base64json',
    });

    server.views({
      engines: {
        hbs: handlebars,
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views',
    });
    server.ext('onPreResponse', site.fileNotFound);
    server.route(routes);
    await server.start();
  } catch (error) {
    server.log('error', error);
    process.exit(1);
  }
  server.log('info', `server listening on ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
  server.log('unhandledRejection', error);
});

process.on('uncaughtException', (error) => {
  server.log('uncaughtException', error);
});

init();
