import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  inject,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;
  
  todosService = inject(TodoService);
  editingText: string = '';

  // when in edit mode initialize the string to edit
  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  // change text function
  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  // another function to update the todoSignal
  changeTodo(): void {
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
