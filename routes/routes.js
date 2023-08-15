const routes = registrationAppLogic => {

    const homeRoute = (req, res) => {
        res.render("index", {
            registrationNumbers: registrationAppLogic.getRegNumbers(),
            messages: registrationAppLogic.getMessages(),
            alertClassNames: registrationAppLogic.getAlertClassNames(),
        });
    };

    const sendRegistrationNumber = (req, res) => {
        const regNumberInput = req.body.regNumberInput;
        registrationAppLogic.setRegNumber(regNumberInput);
        res.redirect("/");
    };

    const filterRoute = (req, res) => {
        const townOrCustomRegNum = req.body.regNumber;
        registrationAppLogic.setTownRegNumber(townOrCustomRegNum);
        res.redirect("/");
    };

    const resetRoute = (req, res) => {
        registrationAppLogic.resetApp();
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