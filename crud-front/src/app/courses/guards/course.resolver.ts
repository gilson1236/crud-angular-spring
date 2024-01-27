import { ResolveFn} from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Course> = (
  route, state, service: CourseService = inject(CourseService)) => {
    console.log(route.params['id'])
    if(route.params && route.params['id']){
      console.log(route.paramMap.get('id')!);
      console.log(service.loadById(route.params['id']))
      return service.loadById(route.params['id']);
    }
      console.log(service.loadById(route.params['id']))
      console.log(route.paramMap.get('id')!);
      return of({_id: '', name: '', category: '', lessons: []});
};
