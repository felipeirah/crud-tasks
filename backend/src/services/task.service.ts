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
  validateTask(data, false);
  return taskRepository.create({ ...data, title: data.title.trim() });
}

export async function updateTask(id: number, data: CreateTaskDTO): Promise<Task> {
  await getTask(id);
  validateTask(data, false);
  return taskRepository.update(id, { ...data, title: data.title.trim() });
}

export async function patchTask(id: number, fields: Partial<CreateTaskDTO>): Promise<Task> {
  await getTask(id);
  validateTask(fields, true);
  return taskRepository.patch(id, fields);
}

export async function deleteTask(id: number): Promise<void> {
  await getTask(id);
  await taskRepository.remove(id);
}

function validateTask(data: Partial<CreateTaskDTO>, isPatch: boolean): void {
  if (!isPatch && !data.title?.trim()) throw new Error('O título é obrigatório');
  if (data.title !== undefined && !data.title.trim()) throw new Error('O título é obrigatório');
  if (data.priority !== undefined && !['baixa', 'media', 'alta'].includes(data.priority)) throw new Error('A prioridade é inválida');
  if (data.due_date !== undefined && data.due_date && Number.isNaN(Date.parse(data.due_date))) throw new Error('A data de entrega é inválida');
}
