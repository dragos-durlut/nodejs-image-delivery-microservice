export class ServedImageResolution {
    public static AreResolutionsEqual(resolutionA: ServedImageResolution, resolutionB: ServedImageResolution): boolean {
        return resolutionA.height === resolutionB.height && resolutionA.width === resolutionB.width;
    }

    public static getResolution(imageResolution: string): ServedImageResolution {
        const width: number = parseInt(this.imageResolutionWidthRegExp.exec(imageResolution)[0], 10);
        const height: number = parseInt(this.imageResolutionHeightRegExp.exec(imageResolution)[0], 10);

        const servedImageResolution = Object.assign(new ServedImageResolution(), {
            width,
            height
        });
        return servedImageResolution;
    }
    private static imageResolutionHeightRegExp: RegExp = RegExp(/([\d ]{2,4})$/i); // https://regex101.com/
    private static imageResolutionWidthRegExp: RegExp = RegExp(/^([\d ]{2,4})/i); // https://regex101.com/
    public width: number;
    public height: number;
    public getResolutionString(): string {
        return `${this.width}x${this.height}`;
    }
}
