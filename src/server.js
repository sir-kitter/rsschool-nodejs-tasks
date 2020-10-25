const { PORT } = require('./common/config');
const mongo = require('./common/mongodb');
const app = require('./app');

mongo.init(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
