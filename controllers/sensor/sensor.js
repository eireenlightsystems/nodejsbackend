const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value) {
    if (value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/sensor?offset=2&limit=5&id_geograph=1&id_sensor_type=1&id_owner=1&id_contract=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {
        var params = [
            isDefault(+req.query.geographId),
            isDefault(+req.query.ownerId),
            isDefault(+req.query.sensorTypeId),
            isDefault(+req.query.contractId),
            isDefault(+req.query.nodeId),

            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from sensor_pkg_i.sensor_vwf($1, $2, $3, $4, $5) f' +
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
        console.log(`Sensor.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Sensor.getAll: The user has already logouted from the database.`});
    }
}

module.exports.getById = function (req, res) {

}

module.exports.ins = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var params = ['ins',
                req.body.id_sensor,
                req.body.id_contract,
                req.body.id_sensor_type,
                req.body.id_node,
                req.body.serial_number,
                req.body.comments];

            await client.query('select sensor_pkg_i.save($1, $2, $3, $4, $5, $6, $7)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_sensor: result.rows[0].save
                });
            });
        } else {
            console.log(`Sensor.create: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Sensor.create: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.upd = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var params = ['upd',
                req.body.id_sensor,
                req.body.id_contract,
                req.body.id_sensor_type,
                req.body.id_node,
                req.body.serial_number,
                req.body.comments];

            await client.query('select sensor_pkg_i.save($1, $2, $3, $4, $5, $6, $7)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_sensor: result.rows[0].save
                });
            });
        } else {
            console.log(`Sensor.update: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Sensor.update: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.set_id_node = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var nodeGateway = req.body;
            var params = [
                nodeGateway.sensorId,
                nodeGateway.nodeId];

            await client.query('select sensor_pkg_i.set_id_node($1, $2)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                };
                res.status(201).json({
                    id_gateway: result.rows[0].set_id_node
                });
            });
        } else {
            console.log(`Sensor..set_id_node: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Sensor..set_id_node: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.del = function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var params = [req.params.id];
            client.query('select sensor_pkg.del($1)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({error: err.message});
                    return;
                }
                ;

                res.status(200).json({
                    message: 'Позиция была удалена.'
                })
            });
        } else {
            console.log(`Sensor.remove: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Sensor.remove: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}


