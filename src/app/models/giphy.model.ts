import { GifImage } from './GifImage.model';
import { Pagination } from './pagination.model';
export interface Giphy {
  gifImages: GifImage[];
  pagination: Pagination;
}
