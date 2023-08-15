// CODE below:

const registrationApp = (database) => {
    let regNumberForTown = [];
    let errorMessage = "";
    let successMessage = "";
    let filteredRegNumber = "";

    const setRegNumber = async userRegNum => {
        const lowerCaseRegNum = userRegNum.toUpperCase().trim();
        let pattern = (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(lowerCaseRegNum);

        if (!pattern && lowerCaseRegNum) {
            // error message
            errorMessage = "Please enter a valid registration number. eg. CA 563-464, CJ 536, CL 7733.";
            // success message
            successMessage = "";

        } else if (!lowerCaseRegNum) {
            errorMessage = "Please enter a registration number.";
            // success message
            successMessage = "";

        } else if (pattern) {

            if (await database.oneOrNone("SELECT reg_number FROM registration_numbers.user_reg_number WHERE reg_number = $1", lowerCaseRegNum)) {
                // error message
                errorMessage = `${lowerCaseRegNum} has already been entered.`;
                // success message
                successMessage = "";

                return;

            } else if (!await database.oneOrNone("SELECT reg_number FROM registration_numbers.user_reg_number WHERE reg_number = $1", lowerCaseRegNum)) {
                // case where the registration number appears for the first time

                await database.none("INSERT INTO registration_numbers.user_reg_number (reg_number) values ($1)", [lowerCaseRegNum]);

                // success message
                successMessage = "Successfully added a registration number.";
                // set error message
                errorMessage = "";
            };
        };
    };

    const setTownRegNumber = async town => {
        const regNumberCol = await database.any("SELECT reg_number FROM registration_numbers.user_reg_number");

        if (regNumberForTown) regNumberForTown = [];
        filteredRegNumber = town;
        successMessage = "";
        errorMessage = "";

        regNumberCol.forEach(regNumberObj => {
            if ((regNumberObj.reg_number).startsWith(town)) {
                regNumberForTown.push(regNumberObj);
            };
        });
    };

    const getRegNumbers = async () => {
        if (filteredRegNumber) return regNumberForTown.filter(regNumber => regNumber.reg_number.startsWith(filteredRegNumber));
        else return await database.any("SELECT reg_number FROM registration_numbers.user_reg_number");
    };

    const getMessages = () => {
        return {
            errorMessage,
            successMessage,
        };
    };

    const getAlertClassNames = () => {
        if (getMessages().errorMessage) return "alert alert-danger";
        else if (getMessages().successMessage) return "alert alert-success";
        else return "";
    };

    const resetApp = async () => {
        errorMessage = "";
        successMessage = "";
        regNumberForTown = [];
        await database.any("DELETE FROM registration_numbers.user_reg_number");
    };

    return {
        setRegNumber,
        getMessages,
        setTownRegNumber,
        getRegNumbers,
        getAlertClassNames,
        resetApp,
    };
};

export default registrationApp;
