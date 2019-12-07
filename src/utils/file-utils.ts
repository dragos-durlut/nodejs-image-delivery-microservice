import fs from "fs";
import util from "util";

export class FileUtils {
    public static async fileExists(fileAbsolutePath: string): Promise<boolean> {
        try {
            const result = await this.fsStat(fileAbsolutePath);
            return result.isFile();
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    // https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await
    // https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists
    private static fsStat = util.promisify(fs.stat);
}