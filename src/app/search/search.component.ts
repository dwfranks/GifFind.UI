import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GifService } from '../services/gif.service';
import { Pagination } from '../models/pagination.model';
import { GifImage } from '../models/gifImage.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private onDestory$ = new Subject<boolean>();

  gifImages: GifImage[];
  pagination: Pagination;

  searchForm = new FormGroup({
    searchField: new FormControl('')
  });

  constructor(private gifService: GifService) { }

  ngOnInit() {

  }

  submit() {
    const value = this.searchForm.value.searchField;

    this.gifService.search(value)
    .pipe(
      takeUntil(this.onDestory$)
    ).subscribe(giphies => {
      if (giphies) {
        this.gifImages = giphies.gifImages;
        this.pagination = giphies.pagination;
      }
    });
  }

  ngOnDestroy() {
    this.onDestory$.next();
    this.onDestory$.unsubscribe();
  }
}
