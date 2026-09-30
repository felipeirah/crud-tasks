import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export async function index(req: Request, res: Response): Promise<void> {
  const { search, completed } = req.query;
  const tasks = await taskService.listTasks({
    search: search ? String(search) : undefined,
    completed: completed === undefined ? undefined : completed === 'true'
  });
  res.json(tasks);
}

export async function show(req: Request, res: Response): Promise<void> {
  res.json(await taskService.getTask(Number(req.params.id)));
}

export async function store(req: Request, res: Response): Promise<void> {
  res.status(201).json(await taskService.createTask(req.body));
}

export async function update(req: Request, res: Response): Promise<void> {
  res.json(await taskService.updateTask(Number(req.params.id), req.body));
}

export async function patch(req: Request, res: Response): Promise<void> {
  res.json(await taskService.patchTask(Number(req.params.id), req.body));
}

export async function destroy(req: Request, res: Response): Promise<void> {
  await taskService.deleteTask(Number(req.params.id));
  res.status(204).send();
}
