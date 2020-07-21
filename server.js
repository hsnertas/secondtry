const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.Promise=global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://user:Hme18161816@ds149700.mlab.com:49700/heroku_wpcrwsf6', {
    useNewUrlParser: true,
    useMongoClient: true
});

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});