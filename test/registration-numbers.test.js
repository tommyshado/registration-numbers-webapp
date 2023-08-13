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

        assert.deepStrictEqual([{"CA 662" : 1}], RegNumbersApp.getRegNumbers());
    });

    it("should be able to set and get a valid customized registration number", () => {
        RegNumbersApp.setRegNumber("jolaksi CA");

        assert.deepStrictEqual([{"JOLAKSI CA": 1}], RegNumbersApp.getRegNumbers());
    });

    it("should be able to update a registration number count", () => {
        // set registration number
        RegNumbersApp.setRegNumber("cj 552-232");
        RegNumbersApp.setRegNumber("cJ 552-232");

        assert.deepStrictEqual([{"CJ 552-232" : 2}], RegNumbersApp.getRegNumbers());
    });

    it("should be able to update a customized registration number", () => {
        RegNumbersApp.setRegNumber("jolaksi CA");
        RegNumbersApp.setRegNumber("Jolaksi CA");

        assert.deepStrictEqual([{"JOLAKSI CA": 2}], RegNumbersApp.getRegNumbers());
    });

    // filtering registration numbers

    it("should be able to filter for CA registration numbers", () => {
        RegNumbersApp.setRegNumber("ca 662");
        RegNumbersApp.setRegNumber("cl 553");
        
        RegNumbersApp.setTownOrCustomRegNumber("CA");

        assert.deepStrictEqual([{"CA 662" : 1}], RegNumbersApp.getTownOrCustomRegNumber());
    });

    it("should be able to filter for CJ registration numbers", () => {
        RegNumbersApp.setRegNumber("cj 223");
        RegNumbersApp.setRegNumber("ca 039-536");
        
        RegNumbersApp.setTownOrCustomRegNumber("CJ");

        assert.deepStrictEqual([{"CJ 223" : 1}], RegNumbersApp.getTownOrCustomRegNumber());
    });

    it("should be able to filter for customized registration number", () => {
        RegNumbersApp.setRegNumber("jolaksi ca");
        RegNumbersApp.setRegNumber("cl 553");
        
        RegNumbersApp.setTownOrCustomRegNumber(null, "custom");

        assert.deepStrictEqual([{"JOLAKSI CA" : 1}], RegNumbersApp.getTownOrCustomRegNumber());
    });

    it("should return an empty array when filtering for town that contains no registration numbers", () => {
        RegNumbersApp.setRegNumber("ca 662");
        RegNumbersApp.setRegNumber("cl 553");
        
        RegNumbersApp.setTownOrCustomRegNumber("CJ");

        assert.deepStrictEqual([], RegNumbersApp.getTownOrCustomRegNumber());
    });

});
