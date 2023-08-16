const routes = registrationAppLogic => {

    const homeRoute = async (req, res) => {

        res.render("index", {
            registrationNumbers: await registrationAppLogic.getRegNumbersLst(),
            // messages: registrationAppLogic.getMessages(),
            // alertClassNames: registrationAppLogic.getAlertClassNames(),
        });
    };

    const sendRegistrationNumber = async (req, res) => {
        const regNumberInput = req.body.regNumberInput;

        registrationAppLogic.setRegNumber(regNumberInput);
        await registrationAppLogic.addRegNumber();

        res.redirect("/");
    };

    const filterRoute = (req, res) => {
        const townCode = req.body.regNumber;
        registrationAppLogic.setRegTownCode(townCode);
        res.redirect("/");
    };

    const resetRoute = async (req, res) => {
        await registrationAppLogic.resetApp();
        res.redirect("/");
    };

    return {
        homeRoute,
        sendRegistrationNumber,
        filterRoute,
        resetRoute,
    };
};

export default routes;