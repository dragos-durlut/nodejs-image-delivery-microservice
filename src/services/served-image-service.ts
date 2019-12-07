import fs from "fs";
import path from "path";
import sharp, { bool, Metadata } from "sharp";
import { ResizedServedImage } from "../models/resized-served-image";
import { ServedImage } from "../models/served-image";
import { ServedImageResolution } from "../models/served-image-resolution";
import { FileUtils } from "../utils/file-utils";
import { FolderStructureUtils } from "../utils/folder-structure-utils";

export class ServedImageService {

    public async getOriginalServedImage(imageName: string): Promise<ServedImage> {
        const originalImagesDirectory = FolderStructureUtils.getOriginalImagesDirectoryPath();
        console.log(`ServedImageService: processing image named ${imageName} in folder ${originalImagesDirectory}`);

        const fileAbsolutePath: string = FolderStructureUtils.getOriginalImageAbsolutePath(imageName);
        const fileExists: boolean = await FileUtils.fileExists(fileAbsolutePath);
        const fileExtension: string = path.extname(fileAbsolutePath);
        const fileName: string = path.basename(fileAbsolutePath).replace(fileExtension, "");
        let height: number | null = null;
        let width: number | null = null;

        if (fileExists) {
            await sharp(fileAbsolutePath).metadata().then((metadata: Metadata) => {
                height = metadata.height;
                width = metadata.width;
            }).catch((err) => {
                console.log(err);
                throw err;
            });
        }

        // typescript field initializer (maintains "type" definition)
        const servedImage = Object.assign(new ServedImage(), {
            fullName: imageName,
            fileName,
            extension: fileExtension,
            absolutePath: fileAbsolutePath,
            directoryAbsolutePath: originalImagesDirectory,
            existsOnFileSystem: fileExists,
            resolution: Object.assign(new ServedImageResolution(), {
                width,
                height
            })
        });
        console.log(servedImage);
        return servedImage;

    }

    public async getResizedServedImage(servedImage: ServedImage, imageResolution: string): Promise<ResizedServedImage> {
        const resizedFileDirectoryPath = FolderStructureUtils.getResolutionImageDirectoryPath(imageResolution);
        const resizedFileAbsolutePath = FolderStructureUtils.getImageWithResolutionPath(servedImage.fullName, imageResolution);
        const resizedImageResolution: ServedImageResolution = ServedImageResolution.getResolution(imageResolution);

        const resizedServedImage = Object.assign(new ResizedServedImage(), {
            fullName: servedImage.fullName,
            fileName: servedImage.fileName,
            extension: servedImage.extension,
            absolutePath: resizedFileAbsolutePath,
            directoryAbsolutePath: resizedFileDirectoryPath,
            existsOnFileSystem: null, // will be set below
            resolution: resizedImageResolution,
            isSameAsOriginalImage: false,
            originalImage: servedImage
        });
        console.log(resizedServedImage);
        resizedServedImage.existsOnFileSystem = await this.ensureResizedImageExistence(resizedServedImage);
        return Promise.resolve<ResizedServedImage>(resizedServedImage);
    }

    private async ensureResizedImageExistence(resizedServedImage: ResizedServedImage): Promise<boolean> {
        resizedServedImage.existsOnFileSystem = await FileUtils.fileExists(resizedServedImage.absolutePath);
        const imageResolution: string = resizedServedImage.resolution.getResolutionString();
        if (!resizedServedImage.existsOnFileSystem) {
            const resizedImageDirectory: string = FolderStructureUtils.getResolutionImageDirectoryPath(imageResolution);
            const resizedImageDirectoryExists: boolean = await FileUtils.directoryExists(resizedImageDirectory);
            if (!resizedImageDirectoryExists) {
                await FileUtils.createDirectory(resizedImageDirectory);
            }
            await sharp(resizedServedImage.originalImage.absolutePath).resize(resizedServedImage.resolution.width, resizedServedImage.resolution.height).toFile(resizedServedImage.absolutePath);
            resizedServedImage.existsOnFileSystem = true;
        }
        return resizedServedImage.existsOnFileSystem;
    }

}
