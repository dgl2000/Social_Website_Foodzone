const auth = require('./src/auth');
const articles = require('./src/articles');
const profile = require('./src/profile');
const following = require('./src/following');
const session = require('express-session');
const mongoose = require('mongoose');
const profileSchema = require('./src/profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const userSchema = require('./src/userSchema');
const User = mongoose.model('user', userSchema);

const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/foodZone?retryWrites=true&w=majority';
const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = { origin: ['http://localhost:3000', 'https://finalfoodzone-gd25.surge.sh'], credentials: true };
const GOOGLE_CLIENT_ID = "669875158857-e17frrsrtbdug97ki37mqt14hh3ki40k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


const checkUser = (req, res) => {
    const checkUserByUsername = async () => {
        await (connector.then(() => {
            Profile.findOne({ username: req.params.user }, function (err, doc) {
                if (err) {
                    return console.error(err);
                } else {
                    if (!doc) {
                        res.send({ isExist: false });
                    } else {
                        res.send({ isExist: true });
                    }
                }
            });
        }));
    }
    checkUserByUsername();
}

const app = express();
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/username/:user', checkUser);

app.use(session({
    secret: 'doNotGuessTheSecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://foodzone-gd25.herokuapp.com/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        let userRes = {
            status: '',
            username: '',
        };
        const findUserName = async () => {
            await (connector.then(() => {
                User.findOne({ 'auth.google': profile.id + profile.name.givenName + profile.name.familyName }, function (err, doc) {
                    if (err) {
                        return console.error(err);
                    } else {
                        if (!doc) {
                            userRes.status = '0';
                            userRes.username = profile.id + profile.name.givenName + profile.name.familyName;
                            new User({
                                username: profile.id + profile.name.givenName + profile.name.familyName,
                                hash: 'googleAuth',
                                salt: 'googleAuth',
                                auth: [{ 'google': profile.id + profile.name.givenName + profile.name.familyName }],
                                created: Date.now()
                            }).save(function (err, doc) {
                                if (err) {
                                    return console.error(err);
                                } else {
                                    console.log(doc);
                                }
                            });

                            new Profile({
                                username: profile.id + profile.name.givenName + profile.name.familyName,
                                headline: 'Hi! I\'m new here!',
                                email: profile.emails[0].value,
                                zipcode: '12345',
                                dob: '2000-01-20',
                                avatar: profile.photos[0].value,
                                following: []
                            }).save(function (err, doc) {
                                if (err) {
                                    return console.error(err);
                                } else {
                                    console.log(doc);
                                }
                            });

                            return done(null, userRes);
                        } else {
                            if (/^\d+$/.test(doc.username[0])) {
                                userRes.status = '1';
                                userRes.username = doc.username;
                                return done(null, userRes);
                            } else {
                                userRes.status = '2';
                                userRes.username = doc.username.substring(21);
                                return done(null, userRes);
                            }
                        }
                    }
                });
            }));
        }
        findUserName();
    })
);
// Redirect the user to Google for authentication.  When complete,
// Google will redirect the user back to the application at
//     /auth/google/callback
app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })); // could have a passport auth second arg {scope: 'email'}

// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/authGoogle',
        failureRedirect: '/'
    }));

auth(app);
articles(app);
profile(app);
following(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});