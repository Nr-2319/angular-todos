import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { TodoFirebaseService } from './service/todo-firebase.service';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  // signal service for the project 
  todosService = inject(TodoService)

  // firebase service
  todosFirebaseService = inject(TodoFirebaseService)

  ngOnInit(): void {
      this.todosFirebaseService.getTodos().subscribe(todos => {
        // update todos content through firebase
        this.todosService.todosSig.set(todos);
      })
  }
}
