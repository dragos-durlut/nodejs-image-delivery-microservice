export class ServedImageResolution {

    public static AreResolutionsEqual(resolutionA: ServedImageResolution, resolutionB: ServedImageResolution): boolean {
        return resolutionA.height === resolutionB.height && resolutionA.width === resolutionB.width;
    }
    public width: number;
    public height: number;

}
