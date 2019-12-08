import mongodb from "mongodb";

export class DbClient {
    public seedImagesCollection() {

        const client = this.getClient();
        client.connect((err) => {
            const imagesCollection = this.getImagesCollection(client);

            imagesCollection.insertOne({ imageName: "Capture1.PNG", timesServed: 0, timesResized: 0, timesDirectlyServed: 0 });
            imagesCollection.insertOne({ imageName: "Capture2.PNG", timesServed: 0, timesResized: 0, timesDirectlyServed: 0 });

            client.close();
        });
    }

    public incrementValue(imageFullName: string, incrementTimesServed: boolean, incrementTimesResized: boolean, incrementTimesDirectlyServed: boolean) {
        const client = this.getClient();
        client.connect((err) => {

            const imagesCollection = this.getImagesCollection(client);

            imagesCollection.findOneAndUpdate(
                { imageName: imageFullName }
                , {
                    $inc: {
                        timesServed: incrementTimesServed ? 1 : 0
                        , timesResized: incrementTimesResized ? 1 : 0
                        , timesDirectlyServed: incrementTimesDirectlyServed ? 1 : 0
                    }
                },
                { upsert: true }
            );

            client.close();
        });
    }

    private getImageStatsDb(client: mongodb.MongoClient): mongodb.Db {
        return client.db("imageStats");
    }

    private getImagesCollection(client: mongodb.MongoClient): mongodb.Collection<any> {
         return this.getImageStatsDb(client).collection("images");
    }

    private getClient(): mongodb.MongoClient {
        const uri = "mongodb+srv://admin:admin@cluster0-pyydy.mongodb.net/test?retryWrites=true&w=majority";
        const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
        return client;
    }
}
