import { Component, OnInit } from '@angular/core';
import { bookService } from './product-list.component.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
bookService: bookService
livros: any
  constructor(bookService: bookService) { 
    this.bookService = bookService
  }

  ngOnInit(): void {
    this.livros = this.bookService.getBook().subscribe((data => {
      this.livros = data;
      console.log(this.livros);
    }))
  }

}
