// https://know-thy-code.com/mongoose-schemas-models-typescript/
import { connect, connection, Connection } from "mongoose";
import { IImage, IImageModel, Image } from "./image-schema";

declare interface IModels {
    Image: IImageModel;

}

export class DbClient {

    public static get Models() {
        if (!DbClient.instance) {
            DbClient.instance = new DbClient();
        }
        return DbClient.instance.models;
    }

    public static async incrementImageValues(imageName: string, incrementTimesServed: boolean, incrementTimesResized: boolean, incrementTimesDirectlyServed: boolean): Promise<IImage> {
       return DbClient.Models.Image.findOneAndUpdate({
            imageName
        }
            , {
                $inc: {
                    timesServed: incrementTimesServed ? 1 : 0
                    , timesResized: incrementTimesResized ? 1 : 0
                    , timesDirectlyServed: incrementTimesDirectlyServed ? 1 : 0
                }
            }, {
            new: true, upsert: true
        }).exec();
    }

    // https://mongoosejs.com/docs/promises.html
    public static async getImagesCollectionHtml(): Promise<string> {
        return DbClient.Models.Image.find({}).exec().then(async (images) => {
            // write HTML output
            let output: string = "<html><header><title>Images</title></header><body>";
            output += "<h1>List retrieved from DB</h1>";
            output += '<table border="1">';
            output += `<tr> <td><b>Name</b></td><td><b>Nr of served images</b></td><td><b>Nr of times resized</b></td><td><b>Nr of times directly served</b></td></tr>`;

            // process list
            images.forEach((image) => {
                output += `<tr><td>${image.imageName}</td><td>${image.timesServed}</td><td>${image.timesResized}</td><td>${image.timesDirectlyServed}</td></tr>`;
            });

            // write HTML output (ending)
            output += "</table></body></html>";
            console.log(output);
            return output;
        });
    }

    private static instance: DbClient;

    private db: Connection;
    private models: IModels;

    private constructor() {
        connect("mongodb://mongo:27017/docker-node-mongo", { useNewUrlParser: true });
        this.db = connection;
        this.db.on("open", this.connected);
        this.db.on("error", this.error);

        this.models = {
            Image: new Image().model
            // this is where we initialise all models
        };
    }

    private connected() {
        console.log("Mongoose has connected");
    }

    private error(error: any) {
        console.log("Mongoose has errored", error);
    }

}
