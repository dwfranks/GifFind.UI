import { Component, OnInit, Input } from '@angular/core';
import { GifImage } from '../models/gifImage.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { AuthService } from '../services/auth.service';
import { SavedimageService } from '../services/savedimage.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

  @Input()
  image: GifImage;

  isFavorite = false;
  showFull = false;
  loading = true;

  categories: Category[];

  private userID: string;
  private selectedCategory: Category;

  constructor(private readonly categoryService: CategoryService,
              private readonly savedImageService: SavedimageService,
              private readonly authService: AuthService) { }

  ngOnInit() {
    this.userID = this.authService.currentUserValue.user.id;
  }

  onLoad() {
    this.loading = false;
  }

  onFavoriteClick() {
    this.isFavorite = !this.isFavorite;
  }

  onClick() {
    this.showFull = true;
    this.refreshCategories();
  }

  refreshCategories() {
    this.categoryService.getCategories(this.userID)
    .subscribe(values => {
      if (values) {
        this.categories = values;
        console.log(values);
      }
    });
  }

  handleSelectedCategory(category: Category) {
    this.selectedCategory = category;
  }

  handleCategoryAdded(category: string) {
    const newCategory: Category = {
      categoryName: category,
      userID : this.authService.currentUserValue.user.id
    };

    console.log(newCategory);
    this.categoryService.addCategory(newCategory)
      .pipe(
        mergeMap(() => this.categoryService.getCategories(this.userID))
      ).subscribe(values => {
        if (values) {
          this.categories = values;
          console.log(values);
        }});
  }

  handleImageClose() {

    const categoryID = this.selectedCategory ? this.selectedCategory.categoryID : this.categories[0].categoryID;

    const saveImage = this.image;

    saveImage.categoryid = categoryID;

    this.savedImageService.saveImage(saveImage).subscribe();
  }
}
