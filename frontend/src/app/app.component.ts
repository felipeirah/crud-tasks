import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.task.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Taskflow';
}
