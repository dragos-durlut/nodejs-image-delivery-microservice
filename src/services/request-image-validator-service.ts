export class RequestImageValidatorService {

    public errors: string[];

    private imageExtensionRegExp: RegExp = RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i); // https://stackoverflow.com/questions/10473185/regex-javascript-image-file-extension
    private imageResolutionRegExp: RegExp = RegExp(/(^([\d ]{2,5})[x]([\d ]{2,5})$)/i); // https://regex101.com/

    constructor(private imageName: string, private imageResolution: string) {
    }

    public validateImage(): boolean {
        let isOk: boolean = true;
        this.errors = new Array<string>();
        if (!this.imageExtensionRegExp.test(this.imageName)) {
            isOk = false;
            this.errors.push(`Image does not have correct extension(gif|jpg|jpeg|tiff|png)`);
        }
        if (!this.imageResolutionRegExp.test(this.imageResolution)) {
            isOk = false;
            this.errors.push(`Image does not have correct resolution format; example 300x400 or 600x1024`);
        }
        return isOk;
    }
}
