const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

global.productModel = require('./api/models/productModel');
global.saleModel = require('./api/models/saleModel');

const productRoutes = require('./api/routes/productRoutes');
const saleRoutes = require('./api/routes/saleRoutes');

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

// const CONNECTION_URL = 'mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.axanc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true });


const port = process.env.PORT || 8000; // Get port number later from heroku or local host
const app = express(); // where server lives

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTES
productRoutes(app);
saleRoutes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
})

console.log('Server started on http://localhost:' + port);