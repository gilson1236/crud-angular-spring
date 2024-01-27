import { Component, OnInit, ViewChild } from '@angular/core';

import { Course } from '../../model/course';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CourseService } from '../../services/course.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule, AsyncPipe, SharedModule, CoursesListComponent, AsyncPipe],
  host: {ngSkipHydration: 'true'},
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$: Observable<CoursePage> | null = null

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private courseService: CourseService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
      this.refresh()
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
    
  }

  ngOnInit() {
    
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize : 10}) {
    this.courses$ = this.courseService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(() => {
        this.onError('Erro ao caregar cursos.')
        return of( { courses: [], totalElements: 0, totalPages: 0} )
      })
    )
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], { relativeTo: this.route});
  }

  onRemove(course: Course){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Tem certeza de que deseja remover este curso?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.courseService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso Removido com Sucesso!', 'X', { 
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center' 
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        )
      }
    })

  }

}
