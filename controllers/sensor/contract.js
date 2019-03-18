const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value){
    if(value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/contract_sensor
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {
        await client.query('select * from sensor_pkg_i.contract_vw', function (err, result) {
            if (err) {
                console.log('err');
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`Contract_sensor.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Contract_sensor.getAll: The user has already logouted from the database.`});
    }
}

