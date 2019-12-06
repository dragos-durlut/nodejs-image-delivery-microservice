export class ServedImage {
    public fullName: string;
    public extension: string;
    public absolutePath: string;
    public directoryAbsolutePath: string;
    public existsOnFileSystem: boolean | null;
    public resolution: ServedImageResolution;
}
