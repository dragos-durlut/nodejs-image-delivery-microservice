import { expect} from "chai";
import "mocha";
import request from "request";

import { RequestImageValidatorService } from "../services/request-image-validator-service";

describe("Image validator validator", () => {

    it("should pass validation", (done) => {

        const validatorService: RequestImageValidatorService = new RequestImageValidatorService("img1.png", "300x600");
        const isValid: boolean = validatorService.validateImage();
        const assertion1 = expect(isValid).to.be.true; // eslint-disable-line no-use-before-define
        const assertion2 = expect(validatorService.errors.length).to.to.equal(0); // eslint-disable-line no-use-before-define
        done();
    });

    it("should not pass validation", (done) => {

        const validatorService: RequestImageValidatorService = new RequestImageValidatorService("img1.XLSX", "ab0x600");
        const isValid: boolean = validatorService.validateImage();
        const assertion1 = expect(isValid).to.be.false; // eslint-disable-line no-use-before-define
        const assertion2 = expect(validatorService.errors.length).to.to.equal(2); // eslint-disable-line no-use-before-define
        done();
    });

});
