import { Pipe, PipeTransform } from '@angular/core';
import { Husq } from '../types/husq';
import { User } from '../types/user';

@Pipe({
  name: 'timelineHusqs'
})
export class TimelineHusqsPipe implements PipeTransform {

  transform(item: (any)[]): (any)[] {
    return item.filter(husq => !husq.parentId)
  }

}
