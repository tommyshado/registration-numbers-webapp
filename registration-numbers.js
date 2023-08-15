// CODE below:

const registrationApp = () => {
    let lstOfRegNums = [];
    let townOrCustomRegNum = [];

    let errorMessage = "";
    let successMessage = "";
    let filteredRegNumber = "";

    const setRegNumber = userRegNum => {
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

            if (lstOfRegNums.includes(lowerCaseRegNum)) {
                // error message
                errorMessage = `${lowerCaseRegNum} has already been entered.`;
                // success message
                successMessage = "";

                return;

            } else if (!lstOfRegNums.includes(lowerCaseRegNum)) {
                // case where the registration number appears for the first time
                lstOfRegNums.push(lowerCaseRegNum);

                // success message
                successMessage = "Successfully added a registration number.";
                // set error message
                errorMessage = "";
            };
        };
    };


    const setTownOrCustomRegNumber = (town) => {
        if (townOrCustomRegNum.length > 0) townOrCustomRegNum = [];
        filteredRegNumber = town;
        lstOfRegNums.forEach(regNumber => {
            if (regNumber.startsWith(town)) {
                townOrCustomRegNum.push(regNumber);
            };
        });
    };

    const getRegNumbers = () => {
        if (!filteredRegNumber) return lstOfRegNums;

        const filtered = townOrCustomRegNum.filter((regNumber) => regNumber.startsWith(filteredRegNumber));
        if (filtered) return filtered;

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

    const resetApp = () => {
        errorMessage = "";
        successMessage = "";
        lstOfRegNums = [];
        townOrCustomRegNum = [];
    };

    return {
        setRegNumber,
        getMessages,
        setTownOrCustomRegNumber,
        getRegNumbers,
        getAlertClassNames,
        resetApp,
    };
};

export default registrationApp;
