import { Component, computed, inject } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { FilterEnum } from '../../types/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  
})
export class FooterComponent {
  todosService = inject(TodoService);
  filterSig = this.todosService.filterSig;
  filterEnum = FilterEnum;

  activeCount = computed(() => {
    // we get a list then we add filter to this list
    return this.todosService.todosSig().filter((todo) => !todo.isCompleted)
      .length;
  });

  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  itemLeftText = computed(()=> `item${this.activeCount()!==1 ? 's' : ''} left`)

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
    console.log('after change Filter: ', this.todosService.filterSig);
  }
}
