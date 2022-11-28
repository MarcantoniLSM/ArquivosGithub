import { Component } from '@angular/core';
import { Course } from './Cursos/course';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetoAngular';
  name: string= 'Tony';
  courses: Course[] = [];
}
