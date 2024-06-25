import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';
import { TodoFirebaseService } from '../../service/todo-firebase.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
  todosService = inject(TodoService);
  todosFirebaseService = inject(TodoFirebaseService);
  editingId: string | null = null;

  // to filter those todos that will only render
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  });

  // no Todo class
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  // toogle part in code
  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((todo) => todo.isCompleted)
  );

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;

    // array of all the firebase data
    const request$ = this.todosService.todosSig().map((todo) => {
      return this.todosFirebaseService.updateTodo(todo.id, {
        text: todo.text,
        isCompleted: target.checked,
      });
    });

    // subscribe the request and check-uncheck
    forkJoin(request$).subscribe(() => {
      this.todosService.toggleAll(target.checked);
    });
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
