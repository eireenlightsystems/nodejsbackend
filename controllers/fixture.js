const auth = require('./auth')
const errorHandler = require('../utils/errorHandler')

function isDefault(value){
    if(value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/fixture?offset=2&limit=5&id_geograph=1&id_fixture_type=1&id_owner=1&id_substation=1&mode=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {

        var params = [
            isDefault(+req.query.id_geograph),
            isDefault(+req.query.id_owner),
            isDefault(+req.query.id_fixture_type),
            isDefault(+req.query.id_substation),
            isDefault(+req.query.id_mode),
            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select f.id_fixture, f.price, f.dateedit, f.useredit from fixture_pkg_i.fixture_vwf($1, $2, $3, $4, $5) f' +
            ' OFFSET $6 LIMIT $7', params, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`Fixture.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Fixture.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`});
    }
}

module.exports.getById = function (req, res) {

}

module.exports.remove = function (req, res) {

}

module.exports.create = function (req, res) {

}

module.exports.update = function (req, res) {

}
