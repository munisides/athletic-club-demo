const express = require('express')
const morgan = require('morgan');
const { join, dirname } = require('path');
const { fileURLToPath } = require('url');
const bigSet = require('./data/scripts/fakerSeedData/bigDataSet.json');

// instantiate
const app = express();

// path
// const __dirname = dirname(fileURLToPath(import.meta.url));

// static files
app.use('/public', express.static(join(__dirname, '/public')));

// engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// 
app.use(morgan('tiny'));

// routes
//login 
app.get('/users/login', (req, res) => {
        res.render('users/login');
});

// register
app.get('/users/register', (req, res) =>{
    res.render('users/register');
});

// logout 
app.get('/user/logout', (req, res) => {
    res.render('users/logout');
});

// home 
app.get('/', (req, res) => {
    res.render('home');
});

// roster
app.get('/roster', (req, res) => {
    const Users = bigSet;
    res.render('roster/index', { Users });
});

// players
app.get('/roster/players', (req, res) => {
    const Users = bigSet.filter(user => user.role ==='Player');
    res.render('roster/index', { Users });
});

// coaches
app.get('/roster/coaches', (req, res) => {
    const Users = bigSet.filter(user => user.role === 'Coach');
    res.render('roster/index', { Users });
});

// referee
app.get('/roster/referees', (req, res) => {
    const Users = bigSet.filter(user => user.role === 'Referee');
    res.render('roster/index', { Users });
});

// new club member
app.get('/roster/new', (req, res) => {
    res.render('roster/newMember');
});

// update
app.get('/roster/:id/edit', (req, res) => {
    res.render('roster/new'); 

    // res.redirect('/roster/show/:id');
});














const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
