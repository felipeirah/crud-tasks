import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({ selector: 'app-task-form', standalone: true, imports: [CommonModule, FormsModule, RouterLink], templateUrl: './task-form.component.html' })
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', due_date: '', priority: 'media', completed: false }; id?: number; saving = false; loading = false; error = '';
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void { const taskId = this.route.snapshot.paramMap.get('id'); if (taskId) { this.id = Number(taskId); this.loading = true; this.taskService.getById(this.id).subscribe({ next: task => { this.task = { ...task, due_date: task.due_date?.slice(0, 10) || '' }; this.loading = false; }, error: () => { this.error = 'Não foi possível carregar esta tarefa.'; this.loading = false; } }); } }
  save(): void { if (!this.task.title.trim() || this.saving) return; this.saving = true; this.error = ''; const request = this.id ? this.taskService.update(this.id, this.task) : this.taskService.create(this.task); request.subscribe({ next: () => this.router.navigate(['/']), error: () => { this.error = 'Não foi possível salvar a tarefa. Revise os dados e tente novamente.'; this.saving = false; } }); }
}
