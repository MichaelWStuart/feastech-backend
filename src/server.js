import express from 'express';
import bodyParser from 'body-parser'
import routes from './routes';

const app = express();

app
  .use(bodyParser.json())
  .use(routes)
  .listen(8080, () => console.log('server on port 8080'));
