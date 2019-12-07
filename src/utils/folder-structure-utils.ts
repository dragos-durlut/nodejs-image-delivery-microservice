import fs from "fs";
import path from "path";
import { FileUtils } from "../utils/file-utils";
export class FolderStructureUtils {

    public static getOriginalImagesDirectoryPath(): string {
        return `${this.imagesFolder}original/`;
    }

    public static getOriginalImageAbsolutePath(imageName: string): string {
        const originalImagesDirectoryPath: string = this.getOriginalImagesDirectoryPath();
        return `${originalImagesDirectoryPath}${imageName}`;
    }

    public static getResolutionImageDirectoryPath(imageResolution: string): string {
        return `${this.imagesFolder}${imageResolution}/`;
    }
    public static async resolutionImageDirectoryExists(imageResolution: string): Promise<boolean> {
        const directoryPath = this.getResolutionImageDirectoryPath(imageResolution);
        return await FileUtils.directoryExists(directoryPath);
    }
    public static async imageWithResolutionExists(imageName: string, imageResolution: string): Promise<boolean> {
        const filePath = this.getImageWithResolutionPath(imageName, imageResolution);
        return await FileUtils.fileExists(filePath);
    }

    public static getImageWithResolutionPath(imageName: string, imageResolution: string): string {
        const directoryPath = this.getResolutionImageDirectoryPath(imageResolution);
        const filePath = `${directoryPath}${imageName}`;
        return filePath;
    }

    public static async createImageResolutionDirectory(imageResolution: string): Promise<string> {
        const directoryPath = this.getResolutionImageDirectoryPath(imageResolution);
        const isDirCreated: boolean = await FileUtils.createDirectory(directoryPath);
        if (isDirCreated) {
            return directoryPath;
        } else {
            throw Error(`Directory ${directoryPath} could not be created`);
        }
    }
    private static imagesFolder: string = path.join(__dirname, `/../images/`);

}
