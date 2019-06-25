import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const express = require('express');
const path = require('path');
import {notFound, catchErrors} from "./middlewares/errors";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes');
const mongoose = require('mongoose');
import cors from 'cors';
import passport from './config/passport';
import contactRoutes from './routes/contact';
import auth from './routes/auth';
import index from './routes/index';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';




//configure passport
passport();


//connect to a database
const mongodbUri = "mongodb+srv://@cluster0-bpgr9.mongodb.net/database?retryWrites=true";
mongoose.connect(mongodbUri,  {
    useNewUrlParser: true,
    auth:{
        user: 'piotrAdamczyk',
        password: 'kONRAD!$1'
    }
});
const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'));
mongooseConnection.once('open', () => {
    console.log('connected to a database')
});

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(cors());

//routes config
app.use('/', auth());
app.use('/', index());
app.use('/', contactRoutes());

//errors handling
app.use(notFound);
app.use(catchErrors);

module.exports = app;
