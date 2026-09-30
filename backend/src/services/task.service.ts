import * as taskRepository from '../repositories/task.repository';
import { CreateTaskDTO, Task, TaskFilters } from '../types/task';

export async function listTasks(filters: TaskFilters): Promise<Task[]> {
  return taskRepository.findAll(filters);
}

export async function getTask(id: number): Promise<Task> {
  const task = await taskRepository.findById(id);
  if (!task) throw new Error('Tarefa não encontrada');
  return task;
}

export async function createTask(data: CreateTaskDTO): Promise<Task> {
  if (!data.title?.trim()) throw new Error('O título é obrigatório');
  return taskRepository.create(data);
}

export async function updateTask(id: number, data: CreateTaskDTO): Promise<Task> {
  await getTask(id);
  return taskRepository.update(id, data);
}

export async function patchTask(id: number, fields: Partial<CreateTaskDTO>): Promise<Task> {
  await getTask(id);
  return taskRepository.patch(id, fields);
}

export async function deleteTask(id: number): Promise<void> {
  await getTask(id);
  await taskRepository.remove(id);
}
