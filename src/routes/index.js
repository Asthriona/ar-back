const router = require("express").Router();
const Driver = require("../models/driver")
const Race = require("../models/race")

// auth
router.use("/auth", require("./auth"));
// race
router.use('/race', require("./race"));
// driver profiles
router.use('/driver', require("./driver"));


router.get("/", (req,res) => {
    res.json({ message: "Hello!" });
});

module.exports = router