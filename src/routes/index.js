const routes = (app) => {
  // Importing route modules
  const userRoute = require('./userRoute');
  const productRoute = require('./productRoute');
  const orderRoute = require('./orderRoute');

  // Using the imported routes
  app.use('/api/user', userRoute);
  // app.use('/api/product', productRoute);
  // app.use('/api/order', orderRoute);

  // Default route
  // app.get('api/user', (req, res) => {
  //   res.send('User route is working');
  // });
}

module.exports = routes;