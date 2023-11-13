
const mongoose = require('mongoose');
const articleSchema = require('./articleSchema');
const Article = mongoose.model('article', articleSchema);
const connectionString = 'mongodb+srv://imgloriadai:531531666@cluster-gd25.4lsleoq.mongodb.net/?retryWrites=true&w=majority';
const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const updateArticle = (req, res) => {

    if ('commentId' in req.body) {
        if (req.body.commentId === '-1') {
            const insertArticle = async () => {
                await (connector.then(() => {
                    Article.findOneAndUpdate({ pid: req.params.id }, { $push: { comments: req.body.text } }, { new: true },
                        function (err, doc) {
                            if (err) {
                                res.sendStatus(401);
                            } else {
                                res.send({ articles: doc });
                            }
                        }
                    );

                }));
            }

            insertArticle();
        } else {
            const insertArticle = async () => {
                await (connector.then(() => {
                    let fieldComment = 'comments.' + req.body.commentId;
                    Article.findOneAndUpdate({ pid: req.params.id }, { $set: { [fieldComment]: req.body.text } }, { new: true },
                        function (err, doc) {
                            if (err) {
                                res.sendStatus(401);
                            } else {
                                res.send({ articles: doc });
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
                            res.sendStatus(401);
                        } else {
                            res.send({ articles: doc });
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
                            res.sendStatus(401);
                        } else {
                            res.send({ articles: doc });
                        }
                    });

                }));
            }
            getArticleByUsername();
        } else {
            const getArticlesById = async () => {
                await (connector.then(() => {
                    Article.find({ author: req.params.id }, function (err, doc) {
                        if (err) {
                            res.sendStatus(401);
                        } else {
                            res.send({ articles: doc });
                        }
                    });

                }));
            }
            getArticlesById();
        }
    } else {
        const getLoggedInUserArticles = async () => {
            await (connector.then(() => {
                Article.find({ author: req.username }, function (err, doc) {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        res.send({ articles: doc });
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
                    res.sendStatus(401);
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
                        comments: []
                    }).save(function (err, doc) {
                        if (err) {
                            res.sendStatus(401);
                        } else {
                            console.log(doc);
                            Article.find({ author: req.username }, function (err, doc) {
                                if (err) {
                                    res.sendStatus(401);
                                } else {
                                    res.send({ articles: doc });
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
    app.post('/article', addArticle);
}