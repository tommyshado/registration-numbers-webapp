// CODE below:

// modules import
import assert from "assert";
import registrationApp from "../registration-numbers.js";

describe("registrationApp", () => {
    let RegNumbersApp;

    beforeEach(() => {
        RegNumbersApp = registrationApp();
    });

    // setting and getting registration numbers

    it("should be able to set and get valid registration number", () => {
        // set registration number
        RegNumbersApp.setRegNumber("ca 662");

        assert.deepStrictEqual(["CA 662"], RegNumbersApp.getRegNumbers());
    });

    it("should be able to set and get a valid customized registration number", () => {
        RegNumbersApp.setRegNumber("jolaksi CA");

        assert.deepStrictEqual(["JOLAKSI CA"], RegNumbersApp.getRegNumbers());
    });

    it("should be able to the same registration number twice and get one", () => {
        // set registration number
        RegNumbersApp.setRegNumber("cj 552-232");
        RegNumbersApp.setRegNumber("cJ 552-232");

        assert.deepStrictEqual(["CJ 552-232"], RegNumbersApp.getRegNumbers());
    });

    it("should be able to the same customized number twice and get one", () => {
        RegNumbersApp.setRegNumber("jolaksi CA");
        RegNumbersApp.setRegNumber("Jolaksi CA");

        assert.deepStrictEqual(["JOLAKSI CA"], RegNumbersApp.getRegNumbers());
    });

    // filtering registration numbers

    it("should be able to filter for CA registration numbers", () => {
        RegNumbersApp.setRegNumber("ca 662");
        RegNumbersApp.setRegNumber("cl 553");
        
        RegNumbersApp.setTownOrCustomRegNumber("CA");

        assert.deepStrictEqual(["CA 662"], RegNumbersApp.getRegNumbers());
    });

    it("should be able to filter for CJ registration numbers", () => {
        RegNumbersApp.setRegNumber("cj 223");
        RegNumbersApp.setRegNumber("ca 039-536");
        
        RegNumbersApp.setTownOrCustomRegNumber("CJ");

        assert.deepStrictEqual(["CJ 223"], RegNumbersApp.getRegNumbers());
    });

    // it("should be able to filter for customized registration number", () => {
    //     RegNumbersApp.setRegNumber("jolaksi ca");
    //     RegNumbersApp.setRegNumber("cl 553");
        
    //     RegNumbersApp.setTownOrCustomRegNumber("Custom");

    //     console.log(RegNumbersApp.getRegNumbers());

    //     assert.deepStrictEqual(["JOLAKSI CA"], RegNumbersApp.getRegNumbers());
    // });

    it("should return an empty array when filtering for town that contains no registration numbers", () => {
        RegNumbersApp.setRegNumber("ca 662");
        RegNumbersApp.setRegNumber("cl 553");
        
        RegNumbersApp.setTownOrCustomRegNumber("CJ");

        assert.deepStrictEqual([], RegNumbersApp.getRegNumbers());
    });

    // error messages, success messages

    it("should be able to return 'Please enter a registration number.'", () => {
        RegNumbersApp.setRegNumber("");

        assert.equal("Please enter a registration number.", RegNumbersApp.getMessages().errorMessage);
    });

    it("should be able to return 'Please enter a valid registration number. eg. CA 563-464, CJ 536, CL 7733, Jolaksi CA, Tolokazi CJ.'", () => {
        RegNumbersApp.setRegNumber("12453");

        assert.equal("Please enter a valid registration number. eg. CA 563-464, CJ 536, CL 7733, Jolaksi CA, Tolokazi CJ.", RegNumbersApp.getMessages().errorMessage);
    });

    it("should be able to return 'Successfully added a registration number.'", () => {
        RegNumbersApp.setRegNumber("Jolaski CA");

        assert.equal("Successfully added a registration number.", RegNumbersApp.getMessages().successMessage);
    });

    it("should be able to return 'TOLO CL has already been entered.'", () => {
        RegNumbersApp.setRegNumber("Tolo CL");
        RegNumbersApp.setRegNumber("Tolo CL");

        assert.equal("TOLO CL has already been entered.", RegNumbersApp.getMessages().errorMessage);
    });

    // alert classnames from bootstrap

    it("should be able to return the class name 'alert alert-danger'", () => {
        RegNumbersApp.setRegNumber("");

        assert.equal("alert alert-danger", RegNumbersApp.getAlertClassNames());
    });

    it("should be able to return the class name 'alert alert-success'", () => {
        RegNumbersApp.setRegNumber("CA 536");

        assert.equal("alert alert-success", RegNumbersApp.getAlertClassNames());
    });

});
