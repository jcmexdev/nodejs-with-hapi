'use strict';
const Hapi = require('@hapi/hapi');
const handlebars = require('./lib/helpers');
const inert = require('@hapi/inert');
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
    console.error(error);
    process.exit(1);
  }
  console.log(`server listening on ${server.info.uri}`);
}

process.on('unhandledRejection', (error) => {
  console.error(`unhandledRejection: ${error}`);
});

process.on('uncaughtException', (error) => {
  console.error(`uncaughtException: ${error}`);
});

init();
