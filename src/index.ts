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
        if (resolutionExists) {
            // res.sendFile(fileAbsolutePath);
            // If the image does exist on the file system, then stream the image to the response object
            fs.createReadStream(fileAbsolutePath)
                .pipe(res);
        } else { // file with required resolution does not exist, we must resize it
            const fileExtension = path.extname(fileAbsolutePath);
            const fileName = path.basename(fileAbsolutePath).replace(fileExtension, "");
            const resizedFileName = `${fileName}_100x100${fileExtension}`;
            const resizeFileAbsolutePath = imagesFolder + `${resizedFileName}`;
            // create a write stream of the resized image to the system// we have ti give a new name
            /*gm(fileAbsolutePath).resize(100, 100).stream((err, stdout, stderr) => {
                // https://stackoverflow.com/a/12665226/249895
                // https://stackoverflow.com/questions/30913540/why-fs-createreadstream-only-pipe-one-time
                // https://stackoverflow.com/questions/12468471/nodejs-gm-resize-and-pipe-to-response
                // https://stackoverflow.com/questions/25372402/graphicsmagick-processes-resulting-in-empty-file
                // stdout.pipe(res);
                const writeStream = fs.createWriteStream(resizeFileAbsolutePath);
                stdout.pipe(writeStream); // pipe to response
            });*/
            sharp(fileAbsolutePath).resize(100, 100).toFile(resizeFileAbsolutePath, (err, info) => {
                if (err) {
                    // tslint:disable-next-line:no-console
                    console.error(err);
                    res.status(404).send({ error: err });
                } else {
                    res.status(200).sendFile(resizeFileAbsolutePath);
                }
            });

            // resizedFileStreamPassThrough.pipe(fs.createWriteStream(resizeFileAbsolutePath));

            // Create a write stream to the file system
            /*req.pipe(
                new stream.PassThrough().pipe(
                    fs.createWriteStream(fileAbsolutePath)
                )
            );*/

            // pipe to the response at the same time
            // resizedFileStreamPassThrough.pipe(res);
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
