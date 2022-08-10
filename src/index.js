import 'dotenv/config';
import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());

var router = express.Router();

const keycloak = require('../config/keycloak-config.js').getKeycloak();

app.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/',
      protected: '/protected/resource',
    })
);

router.get('/anonymous', (req, res) => {
  res.send("Hello Anonymous");
});

router.get('/admin', keycloak.protect('admin'), (req, res) => {
  res.send("Hello Admin");
});


app.get('/', keycloak.protect('admin'), (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
