//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pg = require('pg')

const app = require('../app')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.sessionConnection = {};

module.exports.login = async function (req, res) {
    var client = module.exports.sessionConnection[req.headers.authorization];
    if (!client) {
        //Подключение к БД
        var userId;
        // var connectionString = "postgres://" + req.body.login + ":" + req.body.password + "@31.134.167.47:5432/light";
        var connectionString = "postgres://" + req.body.login + ":" + req.body.password + "@192.168.0.11:5432/light_db";
        client = new pg.Client(connectionString);

        client.connect(function (err) {
            if (err) {
                console.log(err.message);
                res.status(500).json({message: err.message});
                return;
            } else {
                console.log('PostgreSQL connected.');
                //Определить Id пользователя
                client.query('select usesysid from pg_user where usename = user', function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({message: err.message});
                        return;
                    }
                    ;
                    userId = result.rows[0].usesysid;
                    console.log(`User id = ${userId} has connected.`);
                });

                //Генерация токена
                const token = jwt.sign({
                    login: req.body.login,
                    userId: userId
                }, keys.jwt, {expiresIn: 60 * 60});

                res.status(200).json({
                    token: `Bearer ${token}`,
                    message: `Auth: The user has connected to the database.`
                })

                module.exports.sessionConnection[`Bearer ${token}`] = client;
                console.log('user = ' + module.exports.sessionConnection[`Bearer ${token}`].user + ', database = ' + module.exports.sessionConnection[`Bearer ${token}`].database);
                console.log('token = ' + `Bearer ${token}`);
            }
        });
    } else {
        res.status(200).json({
            token: req.headers.authorization,
            message: `Auth: The user has already connected to the database.`
        });
        console.log(`Auth: The user with the token (${req.headers.authorization}) is already connected to the database.`);
    }
}

module.exports.logout = async function (req, res) {
    if (req.headers.authorization) {
        var client = module.exports.sessionConnection[req.headers.authorization];
        if (client) {
            client.end();
            delete module.exports.sessionConnection[req.headers.authorization];
            console.log(`Logout: The user with the token (${req.headers.authorization}) has logouted from the database.`);
            res.status(200).json({message: `Logout: The user has logouted from the database.`});
        } else {
            console.log(`Logout: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.status(200).json({message: `Logout: The user has already logouted from the database.`});
        }
    } else {
        console.log(`Logout: The user has not token.`);
        res.status(200).json({message: `Logout: The user has not token.`});
    }
}

module.exports.register = async function (req, res) {
}