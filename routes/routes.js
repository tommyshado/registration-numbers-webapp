const routes = registrationAppLogic => {

    const homeRoute = async (req, res) => {

        res.render("index", {
            registrationNumbers: await registrationAppLogic.getRegNumbersLst(),
            messages: req.flash("info")[0],
        });
    };

    const sendRegistrationNumber = async (req, res) => {
        const regNumberInput = req.body.regNumberInput;
        const setRegNumber = registrationAppLogic.setRegNumber(regNumberInput);
        const addRegNumber = await registrationAppLogic.addRegNumber();
        
        !setRegNumber ? req.flash("info", "Please enter a registration number. e.g CA 425-262, CJ 748, Cl 7889") : setRegNumber;
        addRegNumber ? req.flash("info", "Successfully added a registration number.") : req.flash("info", "Registration number has already been added.");

        res.redirect("/");
    };

    const filterRoute = async (req, res) => {
        const townCode = req.body.regNumber;
        const filteredLst = await registrationAppLogic.getRegNumbersLst();
        registrationAppLogic.setRegTownCode(townCode);
        filteredLst ? req.flash("info", "Successfully filtered for town.") : req.flash("Info", "There are not registration numbers for selected towns.");
        res.redirect("/");
    };

    const resetRoute = async (req, res) => {
        await registrationAppLogic.resetApp();
        req.flash("info", "Data has been successfully deleted.");
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