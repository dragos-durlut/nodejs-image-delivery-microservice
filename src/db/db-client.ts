import mongodb from "mongodb";

export class DbClient {

    public incrementValue(imageFullName: string, incrementTimesServed: boolean, incrementTimesResized: boolean, incrementTimesDirectlyServed: boolean) {
        const client = this.getClient();
        client.connect((err) => {

            const imagesCollection = this.getImagesCollection(client);
            // https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
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

    public getImagesCollectionHtml(): Promise<string> {
        // https://medium.com/thecodinghype/https-medium-com-thecodinghype-reading-from-mongodb-database-using-express-js-and-node-js-250ef8b9282a
        // https://stackoverflow.com/questions/35246713/node-js-mongo-find-and-return-data
        const client: mongodb.MongoClient = this.getClient();
        return client.connect().then((connectedClient) => {
            return this.getImagesCollection(connectedClient);
        }).then((imagesCollection) => {
            return imagesCollection.find().toArray();
        }).then(async (images) => {
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
            await client.close();
            return output;
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
