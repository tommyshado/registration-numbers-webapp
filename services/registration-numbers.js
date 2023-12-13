// CODE below:

const registrationApp = (database) => {

    const towns = async () => {
        return await database.manyOrNone(`select * from towns`);
    };

    const regNumbers = async (townCode) => {
        if (!townCode) return await database.manyOrNone(`select * from reg_numbers`);

        else if (townCode === "all") return await database.manyOrNone(`select * from reg_numbers`);

        else return await database.manyOrNone(`select * from reg_numbers where town_code = $1`, [townCode]);
    };

    const addRegNumber = async (reg_number) => {
        const availableTowns = await towns();

        const regNumbers = await database.oneOrNone(`select * from reg_numbers where reg_number = $1`, [reg_number]);

        if (regNumbers) {
            return null;
        };

        let townCode = null;
        availableTowns.forEach(town => {
            const checkRegNumber = reg_number.toUpperCase().startsWith(town.town_code);

            if (checkRegNumber) {
                townCode = town.town_code
            };
        });

        return await database.oneOrNone(`insert into reg_numbers (reg_number, town_code) values ($1, $2) RETURNING id`, [reg_number, townCode]);
    };

    const clearRegNumbers = async () => {
        return await database.any("delete from reg_numbers");
    };

    return {
        towns,
        regNumbers,
        addRegNumber,
        clearRegNumbers
    }
};

export default registrationApp;
