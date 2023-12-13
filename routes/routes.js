const routes = appInstance => {

    const index = async (req, res) => {
        const regNumbers = await appInstance.regNumbers();
        const towns = await appInstance.towns();

        res.render("index", {
            towns: towns,
            regNumbers: regNumbers
        });
    };

    const addRegNumber = async (req, res) => {
        const { reg } = req.body;
        const towns = await appInstance.towns();

        if (reg) {
            const results = towns.some(town => {
                return reg.toUpperCase().startsWith(town.town_code) 
                       && (/^C[AJL]( |)(\d{3,6}|\d{1,5}(-| )\d{1,5})$/).test(reg.toUpperCase());
            });
    
            if (results) {
                const regNumber = await appInstance.addRegNumber(reg);
    
                if (regNumber === null) {
                    req.flash("error", "Registration number already added.");
                    res.redirect("/");
                    return;
                };
    
                req.flash("success", "Successfully added a registration number.")
                res.redirect("/");
                return;
            };
    
            req.flash("error", "Please enter a registration number. e.g CA 425-262, CJ 748, Cl 7889");
            res.redirect("/");
            return;
        };

        req.flash("error", "Please enter a registration number. e.g CA 425-262, CJ 748, Cl 7889");
        res.redirect("/");
        return;
    };

    const filter = async (req, res) => {
        const { regNumber } = req.body;
        const towns = await appInstance.towns();

        if (regNumber) {
            const filtered = await appInstance.regNumbers(regNumber);
            req.flash("success", "Filtered for town.");
            res.render("index", {
                towns: towns,
                regNumbers: filtered
            });
        };
    };

    const clearRegNumbers = async (req, res) => {
        await appInstance.clearRegNumbers();
        req.flash("success", "Data has been successfully deleted.")
        res.redirect("/");
    };

    return {
        index,
        addRegNumber,
        filter,
        clearRegNumbers,
    };
};

export default routes;