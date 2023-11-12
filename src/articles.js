
const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const Article = mongoose.model('article', articleSchema);
const profileSchema = require('./profileSchema');
const Profile = mongoose.model('profile', profileSchema);
const uploadImage = require('./uploadCloudinary');
const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/foodZone?retryWrites=true&w=majority';
const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const updateArticle = (req, res) => {
    if ('commentId' in req.body) {
        if (req.body.commentId === '-1') {
            const insertArticle = async () => {
                await (connector.then(() => {
                    let newComment = { author: req.username, text: req.body.text, date: new Date() };
                    Article.findOneAndUpdate({ pid: req.params.id }, { $push: { comments: newComment } }, { new: true },
                        function (err, doc) {
                            if (err) {
                                return console.error(err);
                            } else {
                                if (!doc) {
                                    res.sendStatus(401);
                                } else {
                                    res.send({ articles: doc });
                                }
                            }
                        }
                    );

                }));
            }

            insertArticle();
        } else {
            const insertArticle = async () => {
                await (connector.then(() => {
                    let fieldComment = 'comments.' + req.body.commentId + '.text';
                    Article.findOneAndUpdate({ pid: req.params.id }, { $set: { [fieldComment]: req.body.text } }, { new: true },
                        function (err, doc) {
                            if (err) {
                                return console.error(err);
                            } else {
                                if (!doc) {
                                    res.sendStatus(401);
                                } else {
                                    res.send({ articles: doc });
                                }
                            }
                        }
                    );

                }));
            }
            insertArticle();
        }
    } else {
        const insertArticle = async () => {
            await (connector.then(() => {
                Article.findOneAndUpdate({ pid: req.params.id, username: req.username }, { $set: { text: req.body.text } }, { new: true },
                    function (err, doc) {
                        if (err) {
                            return console.error(err);
                        } else {
                            if (!doc) {
                                res.sendStatus(401);
                            } else {
                                res.send({ articles: doc });
                            }
                        }
                    }
                );

            }));
        }

        insertArticle();
    }
}

const getArticles = (req, res) => {
    if (req.params.id !== undefined) {
        if (/^[0-9]+$/.test(req.params.id)) {
            const getArticleByUsername = async () => {
                await (connector.then(() => {
                    Article.find({ pid: Number(req.params.id) }, function (err, doc) {
                        if (err) {
                            return console.error(err);
                        } else {
                            if (!doc) {
                                res.sendStatus(401);
                            } else {
                                res.send({ articles: doc });
                            }
                        }
                    });

                }));
            }
            getArticleByUsername();
        } else {
            const getArticlesByAuthor = async () => {
                await (connector.then(() => {
                    Profile.findOne({ username: req.params.id }, function (err, doc) {
                        if (err) {
                            return console.error(err);
                        } else {
                            if (!doc) {
                                res.sendStatus(401);
                            } else {
                                let followArr = doc.following;
                                followArr.push(req.params.i);
                                await(connector.then(() => {
                                    Article.find({ author: { $in: followArr } }, function (err, doc) {
                                        if (err) {
                                            return console.error(err);
                                        } else {
                                            if (!doc) {
                                                res.sendStatus(401);
                                            } else {
                                                res.send({ articles: doc });
                                            }
                                        }
                                    });

                                }));
                            }
                        }
                    });

                }));
            }
            getArticlesByAuthor();
        }
    } else {
        const getLoggedInUserArticles = async () => {
            await (connector.then(() => {
                Profile.findOne({ username: req.username }, function (err, doc) {
                    if (err) {
                        return console.error(err);
                    } else {
                        if (!doc) {
                            res.sendStatus(401);
                        } else {
                            let followArr = doc.following;
                            followArr.push(req.username);
                            Article.find({ author: { $in: followArr } }, function (err, doc) {
                                if (err) {
                                    return console.error(err);
                                } else {
                                    if (!doc) {
                                        res.sendStatus(401);
                                    } else {
                                        res.send({ articles: doc });
                                    }
                                }
                            }).sort({ 'date': -1 });
                        }
                    }
                });

            }));
        }
        getLoggedInUserArticles();
    }
}


const addArticle = (req, res) => {
    let post = req.body.text;
    let pid;

    const insertArticle = async () => {
        await (connector.then(() => {
            Article.findOne({}, function (err, doc) {
                if (err) {
                    return console.error(err);
                } else {
                    if (doc === null || doc.length === 0) {
                        pid = 0;
                    } else {
                        pid = Number(doc.pid) + 1;
                    }
                    new Article({
                        pid: pid,
                        author: req.username,
                        text: post,
                        date: Date.now(),
                        comments: [],
                        imageUrl: req.fileurl
                    }).save(function (err, doc) {
                        if (err) {
                            return console.error(err);
                        } else {
                            Article.find({ author: req.username }, function (err, doc) {
                                if (err) {
                                    return console.error(err);
                                } else {
                                    if (!doc) {
                                        res.sendStatus(401);
                                    } else {
                                        res.send({ articles: doc });
                                    }
                                }
                            });
                        }
                    });
                }
            }).sort({ 'pid': -1 }).limit(1);
        }));
    }
    insertArticle();
}

module.exports = (app) => {
    app.get('/articles/:id?', getArticles);
    app.put('/articles/:id', updateArticle);
    app.post('/article', uploadImage('article'), addArticle);
}