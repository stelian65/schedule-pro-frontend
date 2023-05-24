export default ({ app }) => {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  };
  