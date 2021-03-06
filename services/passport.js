const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// this function is to set cookie with (primary key)id of user
// get mongoose model user and save its id in cookie
passport.serializeUser((user,done) => {
    console.log("Serializing");
    done(null,user.id);
});

//now find the user in mongo DB by id from cookie we get
passport.deserializeUser((id,done) => {
    console.log("Deserializing");
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

// takesuser id, finds the user and set it as req.session

passport.use(
    new GoogleStrategy(
        {
            clientID : keys.googleClientID,
            clientSecret : keys.googleClientSecret,
            callbackURL : '/auth/google/callback',
            proxy : true
        }, 
        async (accessToken,refreshToken,profile,done) => {
            const existingUser = await User.findOne({ googleId : profile.id});
                if(existingUser){
                    console.log("Already have the user");
                    done(null,existingUser);
                }else{
                    console.log("Creating the new user");
                    const user = await new User({ googleId : profile.id }).save();
                    done(null,user);
                }  
        }
    )
);