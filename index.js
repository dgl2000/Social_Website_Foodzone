const auth = require('./src/auth');
const articles = require('./src/articles');
const profile = require('./src/profile');
const following = require('./src/following');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const corsOption = { origin: 'http://localhost:4200', credentials: true };


const app = express();
// app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(cookieParser());
auth(app);
articles(app);
profile(app);
following(app);

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});