import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';
import { SharedModule } from '../../../shared/shared.module';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [AppMaterialModule, AsyncPipe, SharedModule, CategoryPipe],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {

  readonly displayedColumns = ['name','category', 'actions']

  @Input() courses: Course[] = []
  @Output() add = new EventEmitter(false)
  @Output() edit: EventEmitter<Course> = new EventEmitter(false)
  @Output() remove = new EventEmitter(false)
  ngOnInit(){
    
  }

  constructor(private route: ActivatedRoute) {}

    onAdd(){
      this.add.emit(true);
    }

    onEdit(course: Course){
    
      this.edit.emit(course);
    }

    onDelete(course: Course) {
      this.remove.emit(course);
    }

}
