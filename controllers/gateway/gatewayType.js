const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value){
    if(value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/gatewayType
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {
        await client.query('select * from gateway_pkg_i.gateway_type_vw', function (err, result) {
            if (err) {
                console.log('err');
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`GatewayTyper.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `GatewayType.getAll: The user has already logouted from the database.`});
    }
}
