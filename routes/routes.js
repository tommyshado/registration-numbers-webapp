const routes = registrationAppLogic => {

    const homeRoute = async (req, res) => {
        res.render("index", {
            registrationNumbers: await registrationAppLogic.getRegNumbers(),
            messages: registrationAppLogic.getMessages(),
            alertClassNames: registrationAppLogic.getAlertClassNames(),
        });
    };

    const sendRegistrationNumber = async (req, res) => {
        const regNumberInput = req.body.regNumberInput;
        await registrationAppLogic.setRegNumber(regNumberInput);
        res.redirect("/");
    };

    const filterRoute = (req, res) => {
        const townOrCustomRegNum = req.body.regNumber;
        registrationAppLogic.setTownRegNumber(townOrCustomRegNum);
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