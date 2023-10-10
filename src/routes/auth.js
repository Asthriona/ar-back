const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../models/driver");
const Race = require("../models/race");
const User = require("../models/user");
const passport = require("passport");

// Register
router.post('/register', async (req, res) => {
    // return console.log(req.body)
    const { username, password, passwordCheck } = req.body.user
    console.log(username, password, passwordCheck );
    // Check for missing feilds
    if (!username)
        if (!password === passwordCheck) return res.status(401).json({ message: "Passwords don't match" });
    // emailCheck = "";
    usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.status(401).json({ message: "Sorry, this username is already taken!" });
    // encrypt password
    const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        password: hashedPassword,
    });
    await newUser.save()
        .then((data) => {
            res.status(201).json({ message: "User Created! you may now login.", user: data });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: "Sorry an error happened on our side.", error: error.message });
        })
});

// Login

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: "password, or username incorrect" });
        req.logIn(user, (err) => {
            if (err) return next(err);
            // generate token
            const token = jwt.sign({ _id: user._id }, process.env.AUTH_SECRET);
            res.json({
                message: "You are logged in!",
                token
            })
        })
    })(req,res,next);
})

// Loggout
router.get("/logout", (req,res) => {
    req.logOut();
    res.json({ message: "Logged out."});
})
module.exports = router;