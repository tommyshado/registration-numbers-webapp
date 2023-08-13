// CODE below:

const registrationApp = () => {
    const lstOfRegNums = [];
    let errorMessage = "";
    let successMessage = "";
    let townOrCustomRegNum = [];

    const setRegNumber = userRegNum => {
        const lowerCaseRegNum = userRegNum.toUpperCase().trim();
        let pattern = (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(lowerCaseRegNum) || 
                      (/^(.{3,8})[-\s](CA|CL|CJ)$/).test(lowerCaseRegNum); // pattern for custom registration number;

        if (!pattern && lowerCaseRegNum) {
            // error message
            errorMessage = "Please enter a valid registration number. eg. CA 563-464, CJ 536, CL 7733, Jolaksi CA, Tolokazi CJ.";

        } else if (!lowerCaseRegNum) {
            errorMessage = "Please enter a registration number.";

        } else if (pattern) {
            const regNumToBeShown = lstOfRegNums.find(obj => Object.keys(obj)[0] === lowerCaseRegNum);

            if (regNumToBeShown) {
                // case where registration number is already in the lstOfRegNums array
                regNumToBeShown[lowerCaseRegNum]++;

                // error message
                errorMessage = `${lowerCaseRegNum} has already been entered.`;

            } else if (!regNumToBeShown) {
                // case where the registration number appears for the first time
                lstOfRegNums.push({
                    [lowerCaseRegNum]: 1
                });

                // success message
                successMessage = "Successfully added a registration number.";
            };
        };
    };

    const setTownOrCustomRegNumber = (town, custom) => {
        lstOfRegNums.forEach(regNumObj => {
            const registrationNumbers = Object.keys(regNumObj);

            registrationNumbers.forEach(regNumber => {
                if (regNumber.startsWith(town)) {
                    townOrCustomRegNum.push(regNumObj);
                };

                if (custom) {
                    if (regNumber.endsWith("CA") || regNumber.endsWith("CL") || regNumber.endsWith("CJ")) {
                        townOrCustomRegNum.push(regNumObj);
                    };
                };
            });
        });
    };

    const getTownOrCustomRegNumber = () => townOrCustomRegNum;

    const getRegNumbers = () => lstOfRegNums;

    const getMessages = () => {
        return {
            errorMessage,
            successMessage,
        };
    };

    return {
        setRegNumber,
        getRegNumbers,
        getMessages,
        setTownOrCustomRegNumber,
        getTownOrCustomRegNumber,
    };
};

export default registrationApp;