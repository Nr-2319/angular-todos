import { Component, inject } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { TodoFirebaseService } from '../../service/todo-firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // inject addTo fuction from the service
  todosService = inject(TodoService);

  // injectFirebaseAddTo function
  todosFirebaseService = inject(TodoFirebaseService);

  text: string = '';

  // when text changes the string also changes
  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  // implement addTodo in the header from service
  addTodo(): void {
    this.todosFirebaseService.addTodo(this.text).subscribe((addedTodoId) => {
      // this.todosService.addTodo(this.text, crypto.randomUUID());
      this.todosService.addTodo(this.text, addedTodoId);
      this.text = '';
    });
  }
}
