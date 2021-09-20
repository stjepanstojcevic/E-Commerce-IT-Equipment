require("dotenv").config();
const express = require('express');
const cors = require('cors');
const busBoy = require('busboy-body-parser');
const path = require('path')

// Init ExpressJS
const app = express();
// app.use(requireHTTPS);

// Middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(busBoy({ limit: '50mb' }));

// Initialize Databse
require("./config/database").connect();
require('./models');

// Routes
app.use('/api', require('./routes'));


// Start hosting
app.use(express.static('./dist/angular-startup'));


app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './dist/angular-startup')});
});

app.listen(process.env.PORT || 8080);

// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//       return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }








