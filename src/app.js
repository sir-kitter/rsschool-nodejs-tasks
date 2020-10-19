const express = require('express');
// const morgan = require('morgan');  // only single module is allowed according to task
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logging = require('./utilities/loggers');
const errorHandlers = require('./utilities/errorHandlers');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
// morgan.token('body', (req, res) => JSON.stringify(req.body))
// morgan.token('params', req => JSON.stringify(req.params));
// app.use(morgan(':date[iso] method-:method url-:url params-:params body-:body '))

app.use(logging.requestLoggerCallback);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandlers.unhandledHandler);

process.on('uncaughtException', errorHandlers.uncaughtHandler);
process.on('unhandledRejection', errorHandlers.unhandledRejectionHandler);

// throw Error('Oops, uncaughtException!')  // test: uncaughtException

// Promise.reject(Error('Oops, unhandledRejection!'))  // test: unhandledRejection

module.exports = app;
