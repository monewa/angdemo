
import { Injectable } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Course } from './course';
import { Game } from './game';
import { RestDataSource } from './rest.datasource';


@Injectable({
  providedIn: 'root'
})

export class CourseRepository {

  errorFound: boolean= false;
  success: boolean= false;
  errorMessage: string= 'Error Found';
  courses: Course[]= [];
  games: Game[]= [];

  constructor( private rest: RestDataSource,  private message: MessageService) {   
    this.get();  
    // this.courses= this.rest.staticDataCourses;
  }

  getCourses(): Course[]{
    return this.courses;
  }

  getCourse(id: number): Course{
    const course= this.courses.find( c=> { c.id== id } );
    return course || new Course('', '');
  }

  get(): void{
    this.rest.getCourses().subscribe( 
      data => { this.courses= data }, 
      err=> { this.message.setMessage('Error!', `Course data not loaded`, 'error') },
    );
  }

  post(course: Course): void{
    this.rest.newCourse( course).subscribe( 
      (newcourse)=> { this.courses.push(newcourse)  }, 
      err=> { this.message.setMessage('Error!', `Course not saved`, 'error') },
      ()=> { this.message.setMessage('Thank you!', 'Course saved', 'success') }
    );
  }

  put(course: Course, id: number): void{
    this.rest.updateCourse( course, id).subscribe( 
      (newCourse)=>{ 
        const index= this.courses.indexOf(newCourse);
        this.courses.splice(index, 1, newCourse)  
      }, 
      err=> { this.message.setMessage('Error!', `Course not updated`, 'error') },
      ()=> { this.message.setMessage('Thank you!', `You updated [id: ${ id }]`, 'success') }
    );
  }

  delete(id: number): void{
    this.rest.deleteCourse(id).subscribe( 
      oldcourse=> { 
        const index= this.courses.indexOf(oldcourse);
        this.courses.splice(index, 1);
      },
      err=> { this.message.setMessage('Error!', `Course not deleted`, 'error') },
      ()=> { this.message.setMessage('Thank you!', 'Course deleted', 'success') }
    );
  }

}
