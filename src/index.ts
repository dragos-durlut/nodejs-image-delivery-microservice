import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import stream from "stream";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// define a route handler for the image processing
app.get("/image/:imageName/:imageResolution", (req, res) => {
    // res.send(`image named ${req.params.imageName} and resolution ${req.params.imageResolution}`);
    const imageName = req.params.imageName;
    const imageResolution = req.params.imageResolution;
    const imagesFolder = __dirname + `/images/`;
    const fileAbsolutePath = imagesFolder + `${imageName}`;
    const fileExists = fs.existsSync(fileAbsolutePath);
    if (fileExists) { // file with requested resolution already exists
        const resolutionExists: boolean = false; // to see how to organize file and check for different resolutions
        if (resolutionExists) {// If the image does exist on the file system, then stream the image to the response object
            fs.createReadStream(fileAbsolutePath).pipe(res);
        } else { // file with required resolution does not exist, we must resize it
            const fileExtension = path.extname(fileAbsolutePath);
            const fileName = path.basename(fileAbsolutePath).replace(fileExtension, "");
            const resizedFileName = `${fileName}_100x100${fileExtension}`;
            const resizeFileAbsolutePath = imagesFolder + `${resizedFileName}`;
            
            sharp(fileAbsolutePath).resize(100, 100).toFile(resizeFileAbsolutePath, (err, info) => {
                if (err) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                    res.status(404).send({ error: err });
                } else {
                    res.status(200).sendFile(resizeFileAbsolutePath);
                }
            });

            
        }
    } else {
        res.status(404).send({ error: `image named ${imageName} and resolution ${imageResolution} was not found` });
    }
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
