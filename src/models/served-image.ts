import { ServedImageResolution } from "./served-image-resolution";

export class ServedImage {
    public fullName: string;
    public fileName: string;
    public extension: string;
    public absolutePath: string;
    public directoryAbsolutePath: string;
    public existsOnFileSystem: boolean | null;
    public resolution: ServedImageResolution;
}
