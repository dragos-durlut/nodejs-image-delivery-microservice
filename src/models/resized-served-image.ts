import { ServedImage } from "./served-image";

export class ResizedServedImage extends ServedImage {
    public isSameAsOriginalImage: boolean = false;
    public originalImage: ServedImage;
}
