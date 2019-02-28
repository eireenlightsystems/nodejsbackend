const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value) {
    if (value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/node?offset=2&limit=5&id_geograph=1&id_node_type=1&id_owner=1&id_contract=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {

        var params = [
            isDefault(+req.query.id_geograph),
            isDefault(+req.query.id_owner),
            isDefault(+req.query.id_node_type),
            isDefault(+req.query.id_contract),
            isDefault(+req.query.id_gateway),

            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from node_pkg_i.node_vwf($1, $2, $3, $4, $5) f' +
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
        console.log(`Node.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `Node.getAll: The user has already logouted from the database.`});
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
                node.id_node,
                node.id_contract,
                node.id_node_type,
                node.id_geograph,

                node.n_coordinate,
                node.e_coordinate,
                node.price,
                node.comments];

            await client.query('select node_pkg_i.save($1, $2, $3, $4, $5, $6, $7, $8, $9)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_node: result.rows[0].save
                });
            });
        } else {
            console.log(`node.create: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `node.create: The user has already logouted from the database.`});
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
                node.id_node,
                node.id_contract,
                node.id_node_type,
                node.id_geograph,

                node.n_coordinate,
                node.e_coordinate,
                node.price,
                node.comments];

            await client.query('select node_pkg_i.save($1, $2, $3, $4, $5, $6, $7, $8, $9)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_node: result.rows[0].save
                });
            });
        } else {
            console.log(`Node.update: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Node.update: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.set_coords = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var node = req.body;
            var params = [node.id_node,
                node.n_coordinate,
                node.e_coordinate];

            await client.query('select node_pkg_i.set_coords($1, $2, $3)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                }
                ;
                res.status(201).json({
                    id_node: result.rows[0].set_coords
                });
            });
        } else {
            console.log(`Node.set_coords: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Node.set_coords: The user has already logouted from the database.`});
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
            client.query('select node_pkg.del($1)', params, function (err, result) {
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
            console.log(`Node.remove: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Node.remove: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
