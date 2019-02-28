const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value) {
    if (value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/command_switchon?offset=2&limit=5&id_command_type=1&id_command_status=1&id_fixture=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {

        var params = [
            isDefault(+req.query.id_command_type),
            isDefault(+req.query.id_command_status),
            isDefault(+req.query.id_fixture),
            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from command_switchon_pkg_i.command_switchon_vwf($1, $2, $3) f' +
            ' OFFSET $4 LIMIT $5', params, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`Command_switchon.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Command_switchon.getAll: The user has already logouted from the database.`});
    }
}

