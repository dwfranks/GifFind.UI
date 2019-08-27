import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-dropdown.component.html',
  styleUrls: ['./category-dropdown.component.scss']
})
export class CategoryDropdownComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() categories: Category[];
  @Output() addedCategory = new EventEmitter();
  @Output() selected = new EventEmitter();

  show = false;

  selectedCategory: Category;
  newCategory: Category;

  constructor() { }

  ngOnInit() {
  }

  handleCategoryChange() {
    console.log('Cat Selected', this.selectedCategory);
    this.selected.emit(this.selectedCategory);
  }

  onCategoryAddClick() {
    this.show = true;
  }

  onCategorySaveClick() {
    this.show = false;
    this.addedCategory.emit(this.newCategory);
  }

}
