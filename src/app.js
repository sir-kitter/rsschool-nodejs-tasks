const express = require('express');
// const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logging = require('./logging/loggers');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// morgan.token('body', (req, res) => JSON.stringify(req.body))
// morgan.token('query', (req, res) => Object.keys(req.query).length ? JSON.stringify(req.query) : 'absent')
// app.use(morgan(':date[iso] method-:method url-:url query-:query body-:body '))

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
  next();
});

module.exports = app;
