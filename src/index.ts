import express from "express";
import { RequestImageValidatorService } from "./services/request-image-validator-service";
import { ServedImageService } from "./services/served-image-service";
import { FolderStructureUtils } from "./utils/folder-structure-utils";
const app = express();
const port = 8080; // default port to listen

app.use(express.static("images")); // https://expressjs.com/en/starter/static-files.html

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// define a route handler for the image processing
app.get("/image/:imageName/:imageResolution", async (req, res, next) => {
    // res.send(`image named ${req.params.imageName} and resolution ${req.params.imageResolution}`);
    const imageName = req.params.imageName;
    const imageResolution = req.params.imageResolution;
    console.log(`requested image named ${imageName} and resolution ${imageResolution}`);
    const imageValidatorService: RequestImageValidatorService = new RequestImageValidatorService(imageName, imageResolution);
    if (!imageValidatorService.validateImage()) {
        res.status(404).send({ errors: imageValidatorService.errors });
    }

    const imageExistsPhysically: boolean = await FolderStructureUtils.imageWithResolutionExists(imageName, imageResolution);
    if (imageExistsPhysically) {
        const imagePath = FolderStructureUtils.getImageWithResolutionPath(imageName, imageResolution);
        res.status(200).sendFile(imagePath);
        return;
    }

    const serverImageService: ServedImageService = new ServedImageService();
    const originalServedImage = await serverImageService.getOriginalServedImage(imageName); // https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
    if (originalServedImage.existsOnFileSystem) {// if image exists we can proceed to try and serve the resized image
        const resizedImage = await serverImageService.getResizedServedImage(originalServedImage, imageResolution);
        res.status(200).sendFile(resizedImage.absolutePath);
    } else {
        res.status(404).send({ error: `File ${imageName} does not exist on file system at ${originalServedImage.absolutePath}` });
    }

});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
