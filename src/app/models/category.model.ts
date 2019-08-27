import { GifImage } from './GifImage.model';

export interface Category {
    categoryID?: string;
    categoryName: string;
    userID: string;
    savedImages?: GifImage[];
}
