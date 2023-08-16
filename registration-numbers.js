// CODE below:

const registrationApp = (database) => {
    let regNumber = "";
    let regTownCode = "";
    let addFilter = false;

    const isValidRegNumber = (reg) => {
        const upperCaseReg = reg.toUpperCase();
        const pattern = (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(upperCaseReg);
        return pattern;
    };

    const setRegNumber = regNum => {
        if (isValidRegNumber(regNum)) regNumber = regNum;
        // else error message
    };

    const setRegTownCode = townCode => {
        regTownCode = townCode;
    };

    const addRegNumber = async () => {
        addFilter = false;
        
        if (regNumber) {
            const regNumCheck = await database.oneOrNone("SELECT reg FROM registration_numbers.reg_numbers WHERE reg = $1", regNumber);

            if (!regNumCheck) {
                // insert into the database
                await database.none("INSERT INTO registration_numbers.reg_numbers (reg) values ($1)", [regNumber]);
            };
            // else error message
        };
    };

    const getRegNumbersLst = async () => await database.any("SELECT reg FROM registration_numbers.reg_numbers");

    const getFilteredRegNum = async () => {
        const townCodeCol = await database.any("SELECT town_code FROM registration_numbers.reg_numbers");
        addFilter = true;
    };

    const resetApp = async () => {
        return await database.any("DELETE FROM registration_numbers.reg_numbers");
    };

    return {
        isValidRegNumber,
        setRegNumber,
        setRegTownCode,
        addRegNumber,
        getRegNumbersLst,
        getFilteredRegNum,
        resetApp,
    }
};

export default registrationApp;
