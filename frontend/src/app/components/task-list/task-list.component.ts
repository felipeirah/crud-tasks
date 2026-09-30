import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({ selector: 'app-task-list', standalone: true, imports: [CommonModule, FormsModule, RouterLink], templateUrl: './task-list.component.html' })
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; search = ''; status = 'todas'; loading = true;
  constructor(private taskService: TaskService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading = true;
    const completed = this.status === 'todas' ? undefined : this.status === 'concluidas';
    this.taskService.list({ search: this.search, completed }).subscribe({
      next: tasks => { this.tasks = tasks; this.loading = false; },
      error: () => { this.tasks = []; this.loading = false; }
    });
  }
  toggleCompletion(task: Task): void { if (task.id) this.taskService.patch(task.id, { completed: !task.completed }).subscribe(() => this.load()); }
  remove(task: Task): void { if (task.id && confirm(`Excluir a tarefa “${task.title}”?`)) this.taskService.delete(task.id).subscribe(() => this.load()); }
}
