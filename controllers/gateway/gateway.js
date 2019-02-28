const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value) {
    if (value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/gateway?offset=2&limit=5&id_geograph=1&id_gateway_type=1&id_owner=1&id_contract=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {

        var params = [
            isDefault(+req.query.id_geograph),
            isDefault(+req.query.id_owner),
            isDefault(+req.query.id_gateway_type),
            isDefault(+req.query.id_contract),
            isDefault(+req.query.id_node),

            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from gateway_pkg_i.gateway_vwf($1, $2, $3, $4, $5) f' +
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
        console.log(`Gateway.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Gateway.getAll: The user has already logouted from the database.`});
    }
}

module.exports.getById = function (req, res) {

}

module.exports.ins = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var node = req.body;
            var params = ['ins',
                node.id_gateway,
                node.id_contract,
                node.id_gateway_type,
                node.id_node,
                node.price,
                node.comments];

            await client.query('select gateway_pkg_i.save($1, $2, $3, $4, $5, $6, $7)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_gateway: result.rows[0].save
                });
            });
        } else {
            console.log(`Gateway.create: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Gateway.create: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.upd = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var node = req.body;
            var params = ['upd',
                node.id_gateway,
                node.id_contract,
                node.id_gateway_type,
                node.id_node,
                node.price,
                node.comments];

            await client.query('select gateway_pkg_i.save($1, $2, $3, $4, $5, $6, $7)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_gateway: result.rows[0].save
                });
            });
        } else {
            console.log(`Gateway.update: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Gateway.update: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.set_id_node = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var gateway = req.body;
            var params = [
                gateway.id_gateway,
                gateway.id_node];

            await client.query('select gateway_pkg_i.set_id_node($1, $2)', params, function (err, result) {
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
            console.log(`Gateway.set_id_node: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Gateway.set_id_node: The user has already logouted from the database.`});
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
            client.query('select gateway_pkg.del($1)', params, function (err, result) {
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
            console.log(`Gateway.remove: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Gateway.remove: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
