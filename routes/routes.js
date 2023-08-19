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
        registrationAppLogic.setRegTownCode(townCode);
        const filteredLst = await registrationAppLogic.getFilteredRegNum();

        if (filteredLst.length > 0) {
            req.flash("info", "Successfully filtered for town.");
        }else if (filteredLst.length === 0) {
            req.flash("info", "There are no registration numbers for selected town.");
        };

        res.redirect("/");
    };

    const resetRoute = async (req, res) => {
        const setToDefualt = await registrationAppLogic.resetApp();

        setToDefualt ? req.flash("info", "Data has been successfully deleted.") : req.flash("info", "Request to delete has been successfully cancelled.");
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