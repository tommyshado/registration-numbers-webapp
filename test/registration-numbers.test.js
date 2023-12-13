// CODE below:

// modules import
import assert from "assert";
import registrationApp from "../services/registration-numbers.js";
import pgPromise from "pg-promise";
import "dotenv/config";

const pgp = pgPromise();
const connectionString =
    process.env.DB_LINK_TEST ||
    "postgres://qxhcpkky:yzmf97rw-WIK2eebq9h0jUKnaAzsEz4N@cornelius.db.elephantsql.com/qxhcpkky";
const db = pgp(connectionString);

describe("registrationApp", function () {
    this.timeout(9000);
    const RegNumbersApp = registrationApp(db);

    beforeEach(async () => {
        try {
            await db.none("truncate table reg_numbers restart identity cascade");
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to retreive all available towns", async () => {
        try {
            const towns = await RegNumbersApp.towns();

            assert.deepEqual(
                [
                    {
                        id: 1,
                        town: "Cape Town",
                        town_code: "CA",
                    },
                    {
                        id: 2,
                        town: "Stellenbosch",
                        town_code: "CL",
                    },
                    {
                        id: 3,
                        town: "paarl",
                        town_code: "CJ",
                    },
                ],
                towns
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to add a registration number", async () => {
        try {
            await RegNumbersApp.addRegNumber("ca 756");
            const regNumbers = await RegNumbersApp.regNumbers();

            assert.equal(1, regNumbers.length);

        } catch (error) {
            console.log(error);
            throw error;
        };
    });

    it("should be able to filter for CA registration numbers", async () => {
        try {

            await RegNumbersApp.addRegNumber("ca 756");
            await RegNumbersApp.addRegNumber("cj 746");
            await RegNumbersApp.addRegNumber("cl 553");

            const regNumbersLst = await RegNumbersApp.regNumbers();

            assert.equal(3, regNumbersLst.length)

            const regNumbers = await RegNumbersApp.regNumbers("CA");       

            assert.equal(1, regNumbers.length);

        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to filter for CJ registration numbers", async () => {
        try {

            await RegNumbersApp.addRegNumber("ca 756");
            await RegNumbersApp.addRegNumber("cj 746");
            await RegNumbersApp.addRegNumber("cl 553");

            const regNumbersLst = await RegNumbersApp.regNumbers();

            assert.equal(3, regNumbersLst.length)

            const regNumbers = await RegNumbersApp.regNumbers("CJ");       

            assert.equal(1, regNumbers.length);

        } catch (error) {
            console.log(error);
            throw error;
        }
    });

    it("should be able to filter for all registration numbers", async () => {
        try {

            await RegNumbersApp.addRegNumber("ca 756");
            await RegNumbersApp.addRegNumber("cj 746");
            await RegNumbersApp.addRegNumber("cl 553");

            const regNumbersLst = await RegNumbersApp.regNumbers();

            assert.equal(3, regNumbersLst.length)

            const regNumbers = await RegNumbersApp.regNumbers("all");       

            assert.equal(3, regNumbers.length);

        } catch (error) {
            console.log(error);
            throw error;
        }

    });

    after(() => {
        db.$pool.end;
    });
});
