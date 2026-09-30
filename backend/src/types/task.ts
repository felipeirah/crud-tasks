export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  priority: TaskPriority;
  completed: boolean;
  created_at: Date;
}

export interface TaskFilters {
  search?: string;
  completed?: boolean;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  due_date?: string;
  priority?: TaskPriority;
  completed?: boolean;
}
