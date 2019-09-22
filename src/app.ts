import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import conf from '../config/mongodb';
import response from './middleware/response';
import getip from './middleware/getip';
import router from './routes';
import * as cors from 'koa2-cors';

mongoose.connect(
  `mongodb://${conf.host}:${conf.port}/${conf.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('open', () => {

  const app = new Koa();

  // response middleware
  app.use(response);

  // getip middleware
  app.use(getip);

  // cors middleware
  app.use(cors());

  // router middleware
  app.use(router.routes());
  app.use(router.allowedMethods());

  // run the server
  app.listen(3000);

  console.log('server start on port 3000');
});