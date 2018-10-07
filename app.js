const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const { mongodb } = require('./config/keys');

const app = express();

// set up view engine
app.set('view engine','ejs');

// connect to mongodb
mongoose.connect(mongodb.dbURL, () => {
  console.log(`Connected to DB`);
})

// setup routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
})

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});