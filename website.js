const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Placeholder session state until a real login system is connected
let userSession = {
    isLoggedIn: false,
    hasRented: true,
    name: 'Placeholder Rider'
};

app.get('/', (req, res) => {
    res.render('login', { user: userSession });
});

app.post('/login', (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    if (email && password) {
        userSession.isLoggedIn = true;
        userSession.name = email.split('@')[0] || 'Placeholder Rider';
        userSession.hasRented = true;
        res.redirect('/tracker');
    } else {
        res.render('login', { user: userSession, error: 'Please enter an email and password.' });
    }
});

app.get('/tracker', (req, res) => {
    if (userSession.isLoggedIn && userSession.hasRented) {
        res.render('tracker', { user: userSession });
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    userSession.isLoggedIn = false;
    userSession.name = 'Placeholder Rider';
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
