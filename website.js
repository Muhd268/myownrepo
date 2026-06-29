const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Mock user session data
let userSession = {
    isLoggedIn: true,
    hasRented: true,
    name: "Cyclist"
};

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/tracker', (req, res) => {
    // Only allow access if a bike is rented
    if (userSession.hasRented) {
        res.render('tracker', { user: userSession });
    } else {
        res.redirect('/');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));