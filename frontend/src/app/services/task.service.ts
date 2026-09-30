import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/api/tasks';
  constructor(private http: HttpClient) {}

  list(filters?: { search?: string; completed?: boolean }): Observable<Task[]> {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.completed !== undefined) params = params.set('completed', String(filters.completed));
    return this.http.get<Task[]>(this.apiUrl, { params });
  }
  getById(id: number): Observable<Task> { return this.http.get<Task>(`${this.apiUrl}/${id}`); }
  create(task: Task): Observable<Task> { return this.http.post<Task>(this.apiUrl, task); }
  update(id: number, task: Task): Observable<Task> { return this.http.put<Task>(`${this.apiUrl}/${id}`, task); }
  patch(id: number, fields: Partial<Task>): Observable<Task> { return this.http.patch<Task>(`${this.apiUrl}/${id}`, fields); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
