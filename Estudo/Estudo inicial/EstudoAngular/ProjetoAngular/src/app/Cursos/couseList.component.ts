import { Component, OnInit } from "@angular/core";
import { Course } from "./course";

@Component({
    selector:'app-course-list',
    template: '<h2>Course List</h2>'
})
export class CourseListComponent implements OnInit{

    courses: Course[] = [];
    
    ngOnInit(): void{
    
    this.courses = [
    
    {
    
    id: 1,
    
    name: 'angular',
    
    price: 20,
    
    code: '234g',
    
    duration: 3,
    
    rating: 4,
    
    imageUrl:''
    
    },
    
    {
    
    id: 2,
    
    name: 'css',
    
    price: 20,
    
    code: '234h',
    
    duration: 3,
    
    rating: 4.2,
    
    imageUrl:''
    
    },
    
    {
    
    id: 1,
    
    name: 'java',
    
    price: 20,
    
    code: '234j',
    
    duration: 3,
    
    rating: 3.9,
    
    imageUrl:''
    
    }
    
    ]
    
    }
    
    }