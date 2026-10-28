import { Router } from 'express'
import { createTask, deleteTask, getAllWorkspaceTasks, modifyTaskComplitation } from '../controller/task.controller.js';
const taskRouter = Router();

taskRouter.post("/create", createTask)
taskRouter.get("/allTasks", getAllWorkspaceTasks);
taskRouter.patch('/:taskId', modifyTaskComplitation);
taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;