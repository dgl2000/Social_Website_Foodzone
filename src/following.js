const mongoose = require('mongoose');
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/?retryWrites=true&w=majority';
const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const getFollowing = (req, res) => {
    if (req.params.user !== undefined) {
        const getFollowerByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.params.user }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, following: doc.following });
                    }
                });

            }));
        }
        getFollowerByUsername();
    } else {
        const getFollowerByUsername = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ username: doc.username, following: doc.following });
                    }
                });

            }));
        }
        getFollowerByUsername();
    }
}

const addFollowing = (req, res) => {
    const addFollowerByUsername = async () => {
        await (connector.then(() => {
            Profile.findOneAndUpdate({ username: req.username }, { $push: { following: req.params.user } }, { new: true }, function (err, doc) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    res.send({ username: doc.username, following: doc.following });
                }
            });

        }));
    }
    addFollowerByUsername();
}

const deleteFollowing = (req, res) => {
    const delFollowerByUsername = async () => {
        await (connector.then(() => {
            Profile.findOneAndUpdate({ username: req.username }, { $pull: { following: req.params.user } }, { new: true }, function (err, doc) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    res.send({ username: doc.username, following: doc.following });
                }
            });

        }));
    }
    delFollowerByUsername();
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', addFollowing);
    app.delete('/following/:user', deleteFollowing);
}