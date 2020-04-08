'use strict';
const Hapi = require('@hapi/hapi');
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
