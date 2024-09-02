import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './tasks';

@Pipe({
  name: 'filterByStatus',
  standalone: true
})
export class FilterStatusPipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }

}
