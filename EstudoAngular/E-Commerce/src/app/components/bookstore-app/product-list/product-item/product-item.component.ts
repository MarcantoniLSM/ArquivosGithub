import { Component, Input, OnInit } from '@angular/core';
import { book } from '../model/book';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  livros!: book;
  constructor() { }

  ngOnInit(): void {
  }

}
