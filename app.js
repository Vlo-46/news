const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')

const keys = require('./keys')

const app = express();

app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//sessions

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));


//routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const categoryRouter = require('./routes/category');
const articleDetailRouter = require('./routes/article-detail');
const error404Router = require('./routes/404');
const searchResultRouter = require('./routes/search-result');
const loginRouter = require('./routes/login')

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/category', categoryRouter);
app.use('/article-detail', articleDetailRouter);
app.use('/error-404', error404Router);
app.use('/search-result', searchResultRouter);
app.use('/login', loginRouter)

//admin routes

const adminUsersRouter = require('./routes/admin/users')

app.use('/admin-users', adminUsersRouter)


const PORT = process.env.PORT || 3000;

function start() {
    try {
        mongoose.connect(keys.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server is listening on port ' + PORT)
        })

    } catch (e) {
        console.log(e)
    }
}
start()