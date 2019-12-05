import express from "express";
import fs from "fs";
import gm from "gm";
import stream from "stream"
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
    const fileAbsolutePath = __dirname + `/images/${imageName}`;
    const fileExists = fs.existsSync(fileAbsolutePath);
    if (fileExists) { //file with requested resolution already exists
        let resolutionExists: boolean = true; //to see how to organize file and check for different resolutions
        if (resolutionExists) {
            //res.sendFile(fileAbsolutePath);
            // If the image does exist on the file system, then stream the image to the response object
            fs.createReadStream(fileAbsolutePath)
                .pipe(res);
        }
        else { //file with required resolution does not exist, we must resize it
            gm(fileAbsolutePath).resize(100, 100, null);

            // Create a write stream to the file system
            req.pipe(
                new stream.PassThrough().pipe(
                    fs.createWriteStream(fileAbsolutePath)
                )
            );

            // pipe to the response at the same time
            req.pipe(res);
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
