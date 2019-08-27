import { OriginalStill } from './originalStill.model';
import { Original } from './original.model';
import { PreviewGif } from './previewGif.model';
export interface GifImage {
  id?: string;
  categoryid?: string
  title: string;
  source_url: string;
  orgin_url: string;
  original_still: OriginalStill;
  original: Original;
  previewGif: PreviewGif;
}
