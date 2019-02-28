const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

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
            isDefault(+req.query.id_contract),
            isDefault(+req.query.id_node),
            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from fixture_pkg_i.fixture_vwf($1, $2, $3, $4, $5, $6, $7) f' +
            ' OFFSET $8 LIMIT $9', params, function (err, result) {
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
        res.json({message: `Fixture.getAll: The user has already logouted from the database.`});
    }
}

module.exports.getById = function (req, res) {

}

module.exports.ins = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var fixture = req.body;
            var params = [ 'ins',
                fixture.id_fixture,
                fixture.id_contract,
                fixture.id_fixture_type,
                fixture.id_geograph,
                fixture.id_installer,
                fixture.id_substation,
                fixture.id_height_type,
                fixture.id_node,

                fixture.numline,
                fixture.side,
                fixture.flg_chief,
                fixture.price,
                fixture.comments];

            await client.query('select fixture_pkg_i.save($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                };
                res.status(201).json({
                    id_fixture: result.rows[0].save
                });
            });
        } else {
            console.log(`Fixture.create: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Fixture.create: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.upd = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var fixture = req.body;
            var params = [ 'upd',
                fixture.id_fixture,
                fixture.id_contract,
                fixture.id_fixture_type,
                fixture.id_geograph,
                fixture.id_installer,
                fixture.id_substation,
                fixture.id_height_type,
                fixture.id_node,

                fixture.numline,
                fixture.side,
                fixture.flg_chief,
                fixture.price,
                fixture.comments];

            await client.query('select fixture_pkg_i.save($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                };
                res.status(201).json({
                    id_fixture: result.rows[0].save
                });
            });
        } else {
            console.log(`Fixture.update: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Fixture.update: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.set_id_node = async function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if (client) {
            var fixture = req.body;
            var params = [
                fixture.id_fixture,
                fixture.id_node];

            await client.query('select fixture_pkg_i.set_id_node($1, $2)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({message: err.message});
                    return;
                };
                res.status(201).json({
                    id_fixture: result.rows[0].set_id_node
                });
            });
        } else {
            console.log(`Fixture.set_id_node: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Fixture.set_id_node: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.del = function (req, res) {
    try {
        var client = auth.sessionConnection[req.headers.authorization];
        if(client) {
            var params = [req.params.id];
            client.query('select fixture_pkg.del($1)', params, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: err.message });
                    return;
                };

                res.status(200).json({
                    message: 'Позиция была удалена.'
                })
            });
        } else {
            console.log(`Fixture.remove: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `Fixture.remove: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
