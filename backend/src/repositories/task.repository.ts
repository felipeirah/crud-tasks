import pool from '../config/database';
import { CreateTaskDTO, Task, TaskFilters } from '../types/task';

export async function findAll(filters: TaskFilters = {}): Promise<Task[]> {
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const values: unknown[] = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    query += ` AND (title ILIKE $${values.length} OR description ILIKE $${values.length})`;
  }
  if (filters.completed !== undefined) {
    values.push(filters.completed);
    query += ` AND completed = $${values.length}`;
  }

  query += ' ORDER BY completed ASC, due_date ASC NULLS LAST, id DESC';
  const result = await pool.query(query, values);
  return result.rows;
}

export async function findById(id: number): Promise<Task | undefined> {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
}

export async function create(data: CreateTaskDTO): Promise<Task> {
  const { title, description, due_date, priority = 'media', completed = false } = data;
  const result = await pool.query(
    `INSERT INTO tasks (title, description, due_date, priority, completed)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description || null, due_date || null, priority, completed]
  );
  return result.rows[0];
}

export async function update(id: number, data: CreateTaskDTO): Promise<Task> {
  const { title, description, due_date, priority = 'media', completed = false } = data;
  const result = await pool.query(
    `UPDATE tasks SET title=$1, description=$2, due_date=$3, priority=$4, completed=$5
     WHERE id=$6 RETURNING *`,
    [title, description || null, due_date || null, priority, completed, id]
  );
  return result.rows[0];
}

export async function patch(id: number, fields: Partial<CreateTaskDTO>): Promise<Task> {
  const keys = Object.keys(fields) as (keyof CreateTaskDTO)[];
  if (!keys.length) return (await findById(id))!;

  const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = [...keys.map(key => fields[key]), id];
  const result = await pool.query(
    `UPDATE tasks SET ${sets} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<void> {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}
