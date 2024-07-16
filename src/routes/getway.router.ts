import { Router } from 'express'
// import { SoldiersRouter } from './soldiers.routes';
import { tasksRouter } from './tasks.routes';
// import { listsRouter } from './lists.routes';

export const getwayRouter = Router();

// getwayRouter.use('/soldiers', SoldiersRouter);
getwayRouter.use('/tasks', tasksRouter);
// getwayRouter.use('/lists', listsRouter);