import fs from "fs";
import path from "path";
import sharp, { Metadata } from "sharp";
import { ResizedServedImage } from "../models/resized-served-image";
import { ServedImage } from "../models/served-image";
import { ServedImageResolution } from "../models/served-image-resolution";

export class ServedImageService {

    // public servedImage: ServedImage;
    // public resizedServedImage: ResizedServedImage;
    private imagesFolder: string = path.join(  __dirname , `/../images/`);
    private imageResolutionHeightRegExp: RegExp = RegExp(/^([\d ]{2,4})/i); // https://regex101.com/
    private imageResolutionWidthRegExp: RegExp = RegExp(/([\d ]{2,4})$/i); // https://regex101.com/

    public async getServedImage(imageName: string): Promise<ServedImage> {

        // tslint:disable-next-line:no-console
        console.log(`ServedImageService: processing image named ${imageName} in folder ${this.imagesFolder}`);

        const fileAbsolutePath: string = path.join( this.imagesFolder , imageName);
        const fileExists: boolean = fs.existsSync(fileAbsolutePath);
        const fileExtension: string = path.extname(fileAbsolutePath);
        const fileName: string = path.basename(fileAbsolutePath).replace(fileExtension, "");
        let height: number | null = null;
        let width: number | null = null;

        if (fileExists) {
            await sharp(fileAbsolutePath).metadata().then((metadata: Metadata) => {
                height = metadata.height;
                width = metadata.width;
            });
        }

        // typescript field initializer (maintains "type" definition)
        const servedImage = Object.assign(new ServedImage(), {
            fullName: imageName,
            fileName,
            extension: fileExtension,
            absolutePath: fileAbsolutePath,
            directoryAbsolutePath: this.imagesFolder,
            existsOnFileSystem: fileExists,
            resolution: Object.assign(new ServedImageResolution(), {
                width,
                height
            })
        });

        return servedImage;

    }

    public getResizedServedImage(servedImage: ServedImage, imageResolution: string): ResizedServedImage {
        const resizedServedImage = Object.assign(new ResizedServedImage(), {
            fullName: servedImage.fullName,
            fileName: servedImage.fileName,
            extension: servedImage.extension,
            absolutePath: servedImage.absolutePath , // TODO: make path with other folder
            directoryAbsolutePath: this.imagesFolder, // TODO: make path with other folder
            existsOnFileSystem: true,
            resolution: this.getResolution(imageResolution)
        });
        return resizedServedImage;
    }

    private getResolution(imageResolution: string): ServedImageResolution {
        const height: number = parseInt(this.imageResolutionHeightRegExp.exec(imageResolution)[0], 10);
        const width: number = parseInt(this.imageResolutionWidthRegExp.exec(imageResolution)[0], 10);

        // tslint:disable-next-line:no-console
        console.log(`height: ${height} | width: ${width}`);

        const servedImageResolution = Object.assign(new ServedImageResolution(), {
            width,
            height
        });
        return servedImageResolution;
    }
}
