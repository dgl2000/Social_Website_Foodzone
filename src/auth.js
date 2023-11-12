let sessionUser = {};
let cookieKey = "sid";
const md5 = require('md5');
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const User = mongoose.model('user', userSchema);
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/foodZone?retryWrites=true&w=majority';

function isLoggedIn(req, res, next) {
    // likely didn't install cookie parser
    if (!req.cookies) {
        return res.sendStatus(401);
    }

    let sid = req.cookies[cookieKey];

    // no sid for cookie key
    if (!sid) {
        return res.sendStatus(401);
    }

    let username = sessionUser[sid];

    // no username mapped to sid
    if (username) {
        req.username = username;
        next();
    }
    else {
        return res.sendStatus(401);
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }

    const findUser = async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        await (connector.then(() => {
            User.findOne({ username: username }, function (err, doc) {
                if (err) {
                    return console.error(err);
                } else {
                    if (!doc) {
                        res.sendStatus(401);
                    } else {
                        let hash = md5(doc.salt + password);
                        if (doc.hash === hash) {
                            let mySecretMessage = "ilovedebugging";
                            const sessionKey = md5(mySecretMessage + new Date().getTime() + doc.username);
                            sessionUser[sessionKey] = doc.username;
                            // Adding cookie for session id
                            res.cookie(cookieKey, sessionKey, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true })
                            let msg = { username: doc.username, result: 'success' };
                            res.send(msg);
                        } else {
                            res.sendStatus(401);
                        }
                    }
                }
            })
        }));
    }

    findUser();
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let dob = req.body.dob;
    let zipcode = req.body.zipcode;

    // supply username, email, dob, zipcode and password
    if (!username || !password || !email || !dob || !zipcode) {
        return res.sendStatus(400);
    }

    let salt = md5(username + new Date().getTime());
    let hash = md5(salt + password);

    const registerUser = async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        await (connector.then(() => {
            new User({
                username: username,
                hash: hash,
                salt: salt,
                created: Date.now(),
                auth: [{ 'google': '' }]
            }).save(function (err, doc) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log(doc);
                }
            });

            new Profile({
                username: username,
                headline: "",
                email: email,
                dob: dob,
                zipcode: zipcode,
                following: [],
                avatar: "",
            }).save(function (err, doc) {
                if (err) {
                    return console.error(err);
                } else {
                    console.log(doc);
                }
            });
        }));
    }

    registerUser();

    let msg = { username: username, result: 'success' };
    res.send(msg);
}

function logout(req, res) {
    sessionUser[req.cookies.sid] = undefined;
    res.sendStatus(200);
}

function googleAuth(req, res) {
    let mySecretMessage = "ilovedebugging";
    const sessionKey = md5(mySecretMessage + new Date().getTime() + req.user.username);
    sessionUser[sessionKey] = req.user.username;
    // Adding cookie for session id
    res.cookie(cookieKey, sessionKey, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true })

    res.redirect('https://finalfoodzone-gd25.surge.sh/main');
}

module.exports = (app) => {
    app.get('/authGoogle', googleAuth);
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
}
