'use strict';

const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();

// http://passportjs.org/docs

/**
 * Facebook
 * https://developers.facebook.com/apps/1732701200392899/fb-login/
 */
passport.use(new FacebookStrategy({
        clientID: '1732701200392899',
        clientSecret: '566be9e0783e9415aa9030476882c278',
        callbackURL: 'http://104.215.157.180/users/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('############### FACEBOOK CALLBACK ######################');
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
        done();
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

router.all('/auth/facebook/deauthorize', (req) => {
    // return signed_request in POST method
    // 'signed_request': 'Jr5homy...1ODAifQ'
    console.log('======DEAUTHORIZED!=======');
    console.log(`HEADERS: ${JSON.stringify(req.headers, null, 2)}`);
    console.log(`QUERY: ${JSON.stringify(req.query, null, 2)}`);
    console.log(`COOKIES: ${JSON.stringify(req.cookies, null, 2)}`);
    console.log(`PARAMS: ${JSON.stringify(req.params, null, 2)}`);
    console.log(`BODY: ${JSON.stringify(req.body, null, 2)}`);
    console.log('==========================');
});






/**
 * Google
 * https://console.developers.google.com/apis/credentials?project=ace-tide-passport
 */
// var googleCredentials = {
//     "web": {
//         "client_id": "849910655721-hg83c3gt7gq2vmdr76kdpd4rnpkr5rvm.apps.googleusercontent.com",
//         "project_id": "ace-tide-passport",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://accounts.google.com/o/oauth2/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_secret": "fG-oFUh7AbRSLWDB5SjVvbii",
//         "redirect_uris": ["http://siang.southeastasia.cloudapp.azure.com", "http://ngrok.io"],
//         "javascript_origins": ["http://104.215.157.180"]
//     }
// };

passport.use(new GoogleStrategy({
        clientID: '849910655721-hg83c3gt7gq2vmdr76kdpd4rnpkr5rvm.apps.googleusercontent.com',
        clientSecret: 'fG-oFUh7AbRSLWDB5SjVvbii',
        callbackURL: 'http://siang.southeastasia.cloudapp.azure.com/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('############### FACEBOOK CALLBACK ######################');
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
        done();
    }
));

router.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login',
        session: false
    })
);





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
