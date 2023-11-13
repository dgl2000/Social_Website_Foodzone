const mongoose = require('mongoose');
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const userSchema = require('./userSchema');
const User = mongoose.model('user', userSchema);
const md5 = require('md5');
const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/?retryWrites=true&w=majority';
const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const updateHeadline = (req, res) => {
    const updateHeadlineByUsername = async () => {
        await (connector.then(() => {
            console.log(req.body.headline);
            Profile.findOneAndUpdate({ username: req.username }, { "$set": { headline: req.body.headline } }, { new: true },
                function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        console.log(doc);
                        res.send({ username: doc.username, headline: doc.headline });
                    }
                }
            );

        }));
    }
    updateHeadlineByUsername();
}

const getHeadline = (req, res) => {
    if (req.params.user !== undefined) {
        const getHeadlineByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, headline: doc.headline });
                    }
                });

            }));
        }
        getHeadlineByUsername();
    } else {
        const getHeadlineByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, headline: doc.headline });
                    }
                });

            }));
        }
        getHeadlineByUsername();
    }
}


const getEmail = (req, res) => {
    if (req.params.user !== undefined) {
        const getEmailByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, email: doc.email });
                    }
                });

            }));
        }
        getEmailByUsername();
    } else {
        const getEmailByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, email: doc.email });
                    }
                });

            }));
        }
        getEmailByUsername();
    }
}

const updateEmail = (req, res) => {
    const updateNewEmail = async () => {
        await (connector.then(() => {
            Profile.findOneAndUpdate({ username: req.username }, { $set: { email: req.body.email } }, { new: true },
                function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, email: doc.email });
                    }
                }
            );

        }));
    }
    updateNewEmail();
}

const getZipcode = (req, res) => {
    if (req.params.user !== undefined) {
        const getZipcodeByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, zipcode: doc.zipcode });
                    }
                });
            }));
        }
        getZipcodeByUsername();
    } else {
        const getZipcodeByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, zipcode: doc.zipcode });
                    }
                });
            }));
        }
        getZipcodeByUsername();
    }
}

const updateZipcode = (req, res) => {
    const updateNewZipcode = async () => {
        await (connector.then(() => {
            Profile.findOneAndUpdate({ username: req.username }, { $set: { zipcode: req.body.zipcode } }, { new: true },
                function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, zipcode: doc.zipcode });
                    }
                }
            );

        }));
    }
    updateNewZipcode();
}

const getDob = (req, res) => {
    if (req.params.user !== undefined) {
        const getDobByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, dob: doc.dob });
                    }
                });
            }));
        }
        getDobByUsername();
    } else {
        const getDobByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, dob: doc.dob });
                    }
                });
            }));
        }
        getDobByUsername();
    }
}

const getAvatar = (req, res) => {
    if (req.params.user !== undefined) {
        const getAvatarByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, avatar: doc.avatar });
                    }
                });
            }));
        }
        getAvatarByUsername();
    } else {
        const getAvatarByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, avatar: doc.avatar });
                    }
                });
            }));
        }
        getAvatarByUsername();
    }
}

const updateAvatar = (req, res) => {
    const updateNewAvatar = async () => {
        await (connector.then(() => {
            Profile.findOneAndUpdate({ username: req.username }, { $set: { avatar: req.body.avatar } }, { new: true },
                function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, avatar: doc.avatar });
                    }
                }
            );

        }));
    }
    updateNewAvatar();
}

const updatePassword = (req, res) => {
    const updateNewPassword = async () => {
        await (connector.then(() => {
            let salt = md5(req.username + new Date().getTime());
            let hash = md5(salt + req.body.password);
            User.findOneAndUpdate({ username: req.username }, { $set: { salt: salt, hash: hash } }, { new: true },
                function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, result: 'success' });
                    }
                }
            );

        }));
    }
    updateNewPassword();
}

module.exports = (app) => {
    app.get('/headline/:user?', getHeadline);
    app.put('/headline', updateHeadline);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/zipcode/:user?', getZipcode);
    app.put('/zipcode', updateZipcode);
    app.get('/dob/:user?', getDob);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', updateAvatar);
    app.put('/password', updatePassword);
}