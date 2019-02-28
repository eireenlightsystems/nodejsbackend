const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value){
    if(value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/owner
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {
        await client.query('select * from fixture_pkg_i.substation_vw', function (err, result) {
            if (err) {
                console.log('err');
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`Substation.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Substation.getAll: The user has already logouted from the database.`});
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
