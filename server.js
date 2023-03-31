const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const connectDB = require('./server/database/connection');

// parse request to body parse
app.use(bodyparser.urlencoded({ extended: true }));

// setting path for the env file
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080

// setting the view engine
app.set({ "views": "ejs" });

// loading the assets into the server
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// setting the template engine
app.set("view engine", "ejs");

// logging he requests
app.use(morgan('tiny'));


// mongodb connection

connectDB();
// setting the port dynamically

app.use("/", require('./server/routes/router'));
// logging port to the console using literals for the port
app.listen(PORT, () => { console.log(`Your app is running on http://localhost:${PORT}`) });


