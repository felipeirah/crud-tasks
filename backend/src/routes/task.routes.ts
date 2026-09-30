import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.get('/tasks', taskController.index);
router.get('/tasks/:id', taskController.show);
router.post('/tasks', taskController.store);
router.put('/tasks/:id', taskController.update);
router.patch('/tasks/:id', taskController.patch);
router.delete('/tasks/:id', taskController.destroy);

export default router;
