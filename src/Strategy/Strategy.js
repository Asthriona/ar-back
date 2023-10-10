const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("./model/user");
LocalStrategy = require('passport-local');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (savedUser, done) => {
    const user = await User.findbyId(savedUser);
    if(user) done(null,user)
});

passport.use(new LocalStategy({
    usernameField: 'username'
}, 
    async function(username, password, done) {
        const user = await User.findOne({ username: username.toLowerCase() });
        if(!user) return done(null, false, { message: "User not found."});
        bcrypt.compare(password, userPassword, (err, res) => {
            if(err) { return done(err), console.log(err.message)};
            if(res === false) { return done(null,false,{message: "Password incorrect"})};
            return done(null, user);
        });
    }
));