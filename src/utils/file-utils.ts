import fs from "fs";
import util from "util";

export class FileUtils {
    public static async createDirectory(directoryPath: string): Promise<boolean> {
        try {
            await this.fsMkDir(directoryPath);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public static async fileExists(fileAbsolutePath: string): Promise<boolean> {
        try {
            const result = await this.fsStat(fileAbsolutePath);
            return result.isFile();
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    public static async directoryExists(fileAbsolutePath: string): Promise<boolean> {
        try {
            const result = await this.fsStat(fileAbsolutePath);
            return result.isDirectory();
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    // https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await
    // https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists
    private static fsStat = util.promisify(fs.stat);
    private static fsMkDir = util.promisify(fs.mkdir);
}
