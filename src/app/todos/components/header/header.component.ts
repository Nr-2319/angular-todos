import { Component, inject } from '@angular/core';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // inject addTo fuction from the service
  todosService = inject(TodoService);

  text: string = '';

  // when text changes the string also changes
  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  // implement addTodo in the header from service
  addTodo():void{
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
