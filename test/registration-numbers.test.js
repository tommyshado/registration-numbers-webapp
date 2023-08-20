// CODE below:

// modules import
import assert from "assert";
import registrationApp from "../services/registration-numbers.js";
import pgPromise from "pg-promise";
import "dotenv/config";

const pgp = pgPromise();
const connectionString = process.env.DB_LINK;
const db = pgp(connectionString);

describe("registrationApp", function () {
    this.timeout(9000);
    const RegNumbersApp = registrationApp(db);

    beforeEach(async () => {
        try {
            await db.none("TRUNCATE TABLE registration_numbers.reg_numbers RESTART IDENTITY CASCADE");
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    // setting and getting registration numbers

    it("should be able to set and get valid registration number", async () => {
        try {

            // set registration number
            RegNumbersApp.setRegNumber("CA 662");
            // add a reg number to the reg numbers list
            await RegNumbersApp.addRegNumber();

            assert.deepStrictEqual(["CA 662"], await RegNumbersApp.getRegNumbersLst());
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to set the same registration number twice and get one registration number", async () => {
        try {
            // set registration number
            RegNumbersApp.setRegNumber("cj 552-232");
            // adding reg number to the reg numbers list
            await RegNumbersApp.addRegNumber();

            // set registration number
            RegNumbersApp.setRegNumber("cJ 552-232");
            // adding reg number to the reg numbers list
            await RegNumbersApp.addRegNumber();

            assert.deepStrictEqual(["CJ 552-232"], await RegNumbersApp.getRegNumbersLst());

        } catch (error) {
            console.log(error);
            throw error;
        };
    });

    // filtering registration numbers

    it("should be able to filter for CA registration numbers", async () => {
        try {

            RegNumbersApp.setRegNumber("ca 662");
            await RegNumbersApp.addRegNumber();

            RegNumbersApp.setRegNumber("cl 553");
            await RegNumbersApp.addRegNumber();

            // set CA town code
            RegNumbersApp.setRegTownCode("1");

            assert.deepStrictEqual(["CA 662"], await RegNumbersApp.getRegNumbersLst());
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to filter for CJ registration numbers", async () => {
        try {

            RegNumbersApp.setRegNumber("cj 223");
            await RegNumbersApp.addRegNumber();
            RegNumbersApp.setRegNumber("ca 039-536");
            await RegNumbersApp.addRegNumber();

            RegNumbersApp.setRegTownCode("2");

            assert.deepStrictEqual(["CJ 223"], await RegNumbersApp.getRegNumbersLst());

        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should return an empty array when filtering for town that contains no registration numbers", async () => {
        try {

            RegNumbersApp.setRegNumber("ca 662");
            await RegNumbersApp.addRegNumber();
            RegNumbersApp.setRegNumber("cl 553");
            await RegNumbersApp.addRegNumber();
            
            RegNumbersApp.setRegTownCode("2");

            assert.deepStrictEqual([], await RegNumbersApp.getRegNumbersLst());

        } catch (error) {
            console.log(error);
            throw error;
        }
        
    });

    after(() => {
        db.$pool.end;
    });

});
