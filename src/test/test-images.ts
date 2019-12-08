import { expect } from "chai";
import request from "request";

it("Main page content", (done) => {
    request("http://localhost:8080", (error, response, body) => {
        expect(body).to.equal("Hello World");
        done();
    });
});
