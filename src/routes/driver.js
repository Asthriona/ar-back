const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Driver = require("../models/driver");
const Race = require("../models/race");
const User = require("../models/user")

async function isAuthorized(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(403).json({ message: "User not found." });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

// get all drivers
router.get('/', async (req, res) => {
    const driver = await Driver.find();
    if (!driver) return res.status(404).json({ message: "No drivers found." });
    res.json({ driver })
});

// Create Driver
router.post('/', async (req, res) => {
    const { name, carNbr, team, image } = req.body;
    const nameCheck = await Driver.findOne({ name });
    const numberCheck = await Driver.findOne({ carNbr });
    if (nameCheck) return res.status(401).json({ message: "This Driver already exist." })
    if (numberCheck) return res.status(401).json({ message: "Sorry, A car with this number already exist." })

    const newDriver = new Driver({
        name,
        carNbr,
        team,
        image: image || "https://cdn.asthriona.com/i/2023/09/dd67e3f912e6660961a60b7759a0e77e_body.png",
    });

    newDriver.save()
        .then((data) => {
            res.json({
                message: "New driver created!",
                driver: data
            })
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({
                message: "Oops, an error happened, please try again."
            })
        })
})

// Update Driver
router.put('/name', (req, res) => {
    res.status(501).json({
        message: "Feature Not implemented yet."
    })
});

// check if Driver profile created
router.get("/check", isAuthorized, async (req, res) => {
    const userId = req.user._id
    if(!userId) return res.status(401).json({ message: "No user provided" })
    const driver = await Driver.findOne({ userId });
    if(driver.lenght <= 0) return res.status(401).json({ driver: null });
    return res.json({ driver });
});

module.exports = router;