var express = require('express');
var router = express.Router();
var path = require('path');
var bCrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Game = require('../models/gameModel');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = function (passport) {

    /* GET login pagina. */
    router.get('/', function (req, res) {
        res.sendfile(path.join(__dirname, '../../client/views/', 'index.html'));
    });

    /* POST login verwerken*/
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/#/home',
        failureRedirect: '/#/login',
        failureFlash : true
    }));

    /* POST registratie verwerken */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#/home',
        failureRedirect: '/login',
        failureFlash : true
    }));

    /* POST profiel updaten */
    router.post('/editprofile/:id', function (req, res) {
        User.findOneAndUpdate({"_id": req.params.id}, {
                username: req.body.username,
                password: createHash(req.body.password2)
            }, {new: true}, 
            function(err, person) {
                if (err) {
                    console.log('got an error');
                } 
            }
        );
    });
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    /* Logout verwerken */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    
    /* GET user gegevens */
    router.get('/status', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false
            });
        } else {
            res.status(200).json({
                status: true,
                user: req.user
            });
        }
    });
    
    router.delete('/delete/:id', function (req, res) {
        User.remove({ _id: req.params.id }, function (err, user) {
            if (err)
                res.send(err);
            res.status(200).end();
        });
    });
    //GET
    router.get('/gamesLoad', function (req, res) {
        Game.find({}, '_id title', function (err, gamedata) {
            if (err) { res.send(err); }
            else { res.json(gamedata); }
        });
    });

    router.get('/gameLoad/:gameid', function (req, res) {
        var gameid = req.params.gameid;
        var o_id = new mongoose.Types.ObjectId(gameid);
        Game.findOne({ '_id': o_id }, function (err, gamedata) {
            if (err) { res.send(err); }
            else { res.json(gamedata); }
        });
    });

    //POST
    router.post('/gameSave', function (req, res) {

        var newGame = new Game({
            title: req.body.title,
            contentStory: req.body.story,
            contentPlayers: req.body.players,
            positions: ["GM", "1", "2", "3", "4", "5", "6"]
        })

        newGame.save(function (err) {
            if (err) { res.send(err); }
            else { res.status(200).end(); }
        });
    });
    
    //PUT
    router.put('/gameUpdate/:gameid', function (req, res) {
        var gameid = req.params.gameid;
        var o_id = new mongoose.Types.ObjectId(gameid);
        var query = { _id: o_id };
        Game.update(query, {
            contentStory: req.body.contentStory,
            contentPlayers: req.body.contentPlayers,
            positions: req.body.positions
        }, function (err) {
            if (err) { res.send(err); }
            else { res.status(200).end(); }
        });
    });
    
    return router;
}
