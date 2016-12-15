'use strict';

const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();


/**
 * Facebook
 */

// https://developers.facebook.com/apps/1732701200392899/fb-login/
passport.use(new FacebookStrategy({
        clientID: '1732701200392899',
        clientSecret: '566be9e0783e9415aa9030476882c278',
        callbackURL: 'http://104.215.157.180/users/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('############### PASSPORT CALLBACK ######################');
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
        done(null, 'kaodim');
    }
));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login',
        session: false
    })
);

router.all('/auth/facebook/deauthorize', (req, res) => {
    // return signed_request in POST method
    // "signed_request": "Jr5homy...1ODAifQ"
    console.log('======DEAUTHORIZED!=======');
    console.log(`HEADERS: ${JSON.stringify(req.headers, null, 2)}`);
    console.log(`QUERY: ${JSON.stringify(req.query, null, 2)}`);
    console.log(`COOKIES: ${JSON.stringify(req.cookies, null, 2)}`);
    console.log(`PARAMS: ${JSON.stringify(req.params, null, 2)}`);
    console.log(`BODY: ${JSON.stringify(req.body, null, 2)}`);
    console.log('==========================');
});










router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/login', (req, res) => {
    res.render('login', {
        title: 'POST!'
    });
});

router.get('/', (req, res) => {
    res.send('respond with a resource');
});

module.exports = router;
