import { TestBed } from '@angular/core/testing';

import { SavedimageService } from './savedimage.service';

describe('SavedimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedimageService = TestBed.get(SavedimageService);
    expect(service).toBeTruthy();
  });
});
