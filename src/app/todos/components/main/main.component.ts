import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  todosService = inject(TodoService);

  // editing ID to edit the todos
  editingId : string | null = null;


  // to filter those todos that will only render
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todos) => !todos.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todos) => todos.isCompleted);
    }

    // when filter is all
    return todos;
  });

  // set function for editingId

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
