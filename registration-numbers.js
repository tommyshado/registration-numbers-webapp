// CODE below:

const registrationApp = (database) => {
    let regNumber = "";
    let regTownCode = "";
    let errorMessage = "";
    let addFilter = false;

    const isValidRegNumber = (reg) => {
        const upperCaseReg = reg.toUpperCase().trim();
        const pattern = (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(upperCaseReg);
        return pattern;
    };

    const setRegNumber = regNum => {
        if (isValidRegNumber(regNum)) regNumber = regNum.toUpperCase();
        // else error message
        else errorMessage = "Please enter a registration number. eg. CA 5464, CJ 875-356, CL 553";
    };

    const setRegTownCode = townCode => {
        addFilter = true;
        regTownCode = townCode;
    };


    const isFromIdRecord = async (regNum) => {
        // table contains records that I manually inserted
        const getRecords = await database.any("select * from registration_numbers.towns");
        let getIdRecord = "";

        getRecords.forEach(record => {

            if ((regNum).startsWith(record.towns_code)) {
                getIdRecord = record.id;
            };
        });

        return getIdRecord;
    };

    const addRegNumber = async () => {
        addFilter = false;
        
        if (regNumber) {
            const regNumCheck = await database.oneOrNone("SELECT reg FROM registration_numbers.reg_numbers WHERE reg = $1", regNumber);

            if (!regNumCheck) {
                let idRecord = await isFromIdRecord(regNumber);
                // insert into the database
                await database.none("INSERT INTO registration_numbers.reg_numbers (reg, town_code) values ($1, $2)", [regNumber, idRecord]);
            } else if (regNumCheck) {
                // else error message
                errorMessage = `${regNumber} has already been entered.`;
            };
        };
    };

    const getRegNumbersLst = async () => {
        let allRegRecords = await database.any("SELECT reg FROM registration_numbers.reg_numbers");
        let regNumber = [];

        // when the show button is triggered
        if (addFilter) {
            // return getFilteredRegNum
            const filteredReg = await getFilteredRegNum();
            return filteredReg;
        } else {
            allRegRecords.forEach(record => regNumber.push(record.reg));
    
            return regNumber;
        };

    };

    const getFilteredRegNum = async () => {
        const townCodeCol = await database.any("SELECT * FROM registration_numbers.reg_numbers");
        let regNumbers = [];

        if (regTownCode) {
            
            townCodeCol.forEach(codeFromTown => {
                // Check the town_code and convert it, into a string then compare then...
                if (codeFromTown.town_code.toString() === regTownCode) {
                    // retrieve all the data with townCode
                    regNumbers.push(codeFromTown.reg);
                };
            });
        };
        return regNumbers;

    };

    const getMessages = () => {
        return {
            errorMessage,
        };
    };

    const getAlertClassNames = () => {
        if (getMessages().errorMessage) return "alert alert-danger";
        // else if (getMessages().successMessage) return "alert alert-success";
        else return "";
    };

    const resetApp = async () => {
        regNumber = "";
        regTownCode = "";
        errorMessage = "";
        addFilter = false;
        return await database.any("DELETE FROM registration_numbers.reg_numbers");
    };

    return {
        isValidRegNumber,
        setRegNumber,
        setRegTownCode,
        isFromIdRecord,
        addRegNumber,
        getRegNumbersLst,
        getFilteredRegNum,
        getMessages,
        getAlertClassNames,
        resetApp,
    }
};

export default registrationApp;
