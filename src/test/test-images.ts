import "mocha";
import request from "request";
import { expect} from "chai";

import { RequestImageValidatorService } from "../services/request-image-validator-service";


describe('Image validator validator', () => {

    it('should pass validation', (done) => {

        let validatorService: RequestImageValidatorService = new RequestImageValidatorService("img1.png", "300x600")
        let isValid: boolean = validatorService.validateImage();
        expect(isValid).to.be.true;
        expect(validatorService.errors.length).to.to.equal(0);
        done();
    });

    it('should not pass validation', (done) => {

        let validatorService: RequestImageValidatorService = new RequestImageValidatorService("img1.XLSX", "ab0x600")
        let isValid: boolean = validatorService.validateImage();
        expect(isValid).to.be.false;
        expect(validatorService.errors.length).to.to.equal(2);
        done();
    });

});