

/** Routes for users. */

const express = require("express");
const User = require("./user");
const router = express.Router();


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, email}
 **/

router.get("/:username", async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

router.get("/meals/:username", async function (req, res, next) {
    try {
        let { username } = req.params;
        const meals = await User.getMeals(username);
        return res.json({ meals });
    } catch (err) {
        return next(err);
    }
});

router.post("/:username/meals", async function (req, res, next) {

    try {
        const mealId = req.body.mealId;
        await User.saveToFoodJournal(req.params.username, { ...req.body });
        return res.json({ Saved: mealId });
    }

    catch (err) {
        return next(err);
    }
})

router.delete("/:username/meals/:meal_id", async function (req, res, next) {

    try {

        const mealId = (req.params.meal_id);
        await User.remove(req.params.username, mealId);
        return res.json({ DELETED: mealId });
    }
    catch (err) { return next(err); }
})

module.exports = router;