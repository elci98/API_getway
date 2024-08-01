import { Router } from 'express';
import { soldiersRouter } from './soldiers.routes';
import { tasksRouter } from './tasks.routes';
import { listsRouter } from './lists.routes';
import { authRouter } from './auth.routes';

export const getwayRouter = Router();

getwayRouter.use('/soldiers', soldiersRouter);
getwayRouter.use('/tasks', tasksRouter);
getwayRouter.use('/lists', listsRouter);
getwayRouter.use('/auth', authRouter);