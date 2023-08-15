// CODE below:

const registrationApp = () => {
    let lstOfRegNums = [];
    let townOrCustomRegNum = [];

    let errorMessage = "";
    let successMessage = "";
    let filteredRegNumber = "";

    const setRegNumber = userRegNum => {
        const lowerCaseRegNum = userRegNum.toUpperCase().trim();
        let pattern = (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(lowerCaseRegNum) || 
                      (/^(.{3,8})[-\s](CA|CL|CJ)$/).test(lowerCaseRegNum); // pattern for custom registration number;

        if (!pattern && lowerCaseRegNum) {
            // error message
            errorMessage = "Please enter a valid registration number. eg. CA 563-464, CJ 536, CL 7733, Jolaksi CA, Tolokazi CJ.";
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
        lstOfRegNums.forEach(regNumber => {
            if (town !== 'Custom' && regNumber.startsWith(town)) {
                filteredRegNumber = town;
                townOrCustomRegNum.push(regNumber);
            };

            if (town === "Custom") {
                if (regNumber.endsWith("CA") || regNumber.endsWith("CL") || regNumber.endsWith("CJ")) {
                    townOrCustomRegNum.push(regNumber);
                };
            };
        });
    };

    const getTownOrCustomRegNumber = () => townOrCustomRegNum;

    const getRegNumbers = () => lstOfRegNums;

    const lstOfRegNumbers = () => {
        if (getTownOrCustomRegNumber().length > 0) {
            return getTownOrCustomRegNumber().filter((regNumber) => regNumber.startsWith(filteredRegNumber) || regNumber.endsWith(filteredRegNumber));
        }
        else return getRegNumbers();
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
        getRegNumbers,
        getMessages,
        setTownOrCustomRegNumber,
        getTownOrCustomRegNumber,
        lstOfRegNumbers,
        getAlertClassNames,
        resetApp,
    };
};

export default registrationApp;
