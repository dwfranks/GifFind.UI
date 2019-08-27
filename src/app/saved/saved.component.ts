import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';
import { GifImage } from '../models/GifImage.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {

  categories: Category[];
  gifImages: GifImage[];

  private userID: string;

  constructor(private readonly authService: AuthService,
              private readonly categoryService: CategoryService) { }

  ngOnInit() {
    this.userID = this.authService.currentUserValue.user.id;

    this.refreshCategories();
  }

  handleCategoryChange(category: Category) {
    this.gifImages = category.savedImages;
  }

  refreshCategories() {
    this.categoryService.getCategories(this.userID)
    .subscribe(values => {
      if (values) {
        this.categories = values;
        this.handleCategoryChange(this.categories[0]);
        console.log(this.categories[0]);
      }
    });
  }
}
