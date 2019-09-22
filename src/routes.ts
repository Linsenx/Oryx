import * as Router from 'koa-router';
import { VisitorController } from './controlller';

const router = new Router({ prefix: '/oryx' });

router.get('/visit', VisitorController.visit);

export default router;