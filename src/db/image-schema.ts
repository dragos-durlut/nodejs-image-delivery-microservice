// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
// https://know-thy-code.com/mongoose-schemas-models-typescript/
import { Document, model, Model, Schema } from "mongoose";

export declare interface IImage extends Document {
    imageName: string;
    timesServed: number;
    timesResized: number;
    timesDirectlyServed: number;
}

export interface IImageModel extends Model<IImage> { }

export class Image {

    private imageModel: Model<IImage>;

    constructor() {
        const schema = new Schema({
            imageName: { type: String, required: true, unique: true },
            timesServed: { type: Number, required: true },
            timesResized: { type: Number, required: true },
            timesDirectlyServed: { type: Number, required: true }
        });

        this.imageModel = model<IImage>("Image", schema);
    }

    public get model(): Model<IImage> {
        return this.imageModel;
    }
}
