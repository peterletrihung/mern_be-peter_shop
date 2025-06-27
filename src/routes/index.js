const routes = (app) => {
  // Importing route modules
  const userRoute = require('./userRoute');
  const productRoute = require('./productRoute');
  const orderRoute = require('./orderRoute');
  const authRoute = require('./authRoute');

  // Using the imported routes
  app.use('/api/user', userRoute);
  app.use('/api', authRoute);
  app.use('/api/product', productRoute);
  // app.use('/api/order', orderRoute);
}

module.exports = routes;