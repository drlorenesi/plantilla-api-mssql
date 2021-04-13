const app = require('./app');
const { connectDB } = require('./config/db');

const env = process.env.NODE_ENV.toUpperCase();
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`- Ambiente: ${env}`);
  console.log(`- Servidor iniciado en puerto: ${port}`);
  connectDB();
});
