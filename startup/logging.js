// require('winston-mongodb');
const winston = require('winston');
require('express-async-errors');

module.exports = function () {
  process.on('unhandledRejection', ex => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
  // winston store uncaught exceprions by using handleExceptions method and creating new transport where to store logs
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info',
  // });

  // Manual approach to store logs about uncaught exceptions, better approach is winston
  // process.on('uncaughtException', ex => {
  //   console.log('WE GOT AN UNCAUGHT EXCEPTION');
  //   winston.error(ex.message, ex);
  // });

  // throw new Error('Something failed during startup'); exception out of Express context
};
