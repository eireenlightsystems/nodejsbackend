const auth = require('../auth')
const errorHandler = require('../../utils/errorHandler')

function isDefault(value){
    if(value != -1)
        return value;
    return null;
}

// (get) http://localhost:5000/api/fixtureGroup?offset=2&limit=5&id_fixture_group_type=1&id_owner=1
module.exports.getAll = async function (req, res) {
    var client = auth.sessionConnection[req.headers.authorization];
    if (client) {

        var params = [
            isDefault(+req.query.ownerId),
            isDefault(+req.query.fixtureGroupTypeId),
            isDefault(+req.query.offset),
            isDefault(+req.query.limit)
        ];

        await client.query('select * from fixture_group_pkg_i.fixture_group_vwf($1, $2) f' +
            ' OFFSET $3 LIMIT $4', params, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send({message: err.message});
                return;
            }
            ;
            res.status(200).json(result.rows);
        });
    } else {
        console.log(`FixtureGroup.getAll: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
        res.json({message: `FixtureGroup.getAll: The user has already logouted from the database.`});
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
                fixture.fixtureGroupId,
                fixture.fixtureGroupTypeId,
                fixture.ownerId,
                fixture.nameFixtureGroup
                ];

            await client.query('select fixture_group_pkg_i.save($1, $2, $3, $4, $5)', params, function (err, result) {
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
            console.log(`FixtureGroup.create: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `FixtureGroup.create: The user has already logouted from the database.`});
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
                fixture.fixtureGroupId,
                fixture.fixtureGroupTypeId,
                fixture.ownerId,
                fixture.nameFixtureGroup];

            await client.query('select fixture_group_pkg_i.save($1, $2, $3, $4, $5)', params, function (err, result) {
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
            console.log(`FixtureGroup.update: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `FixtureGroup.update: The user has already logouted from the database.`});
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
            client.query('select fixture_group_pkg.del($1)', params, function (err, result) {
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
            console.log(`FixtureGroup.remove: The user with the token (${req.headers.authorization}) has already logouted from the database.`);
            res.json({message: `FixtureGroup.remove: The user has already logouted from the database.`});
        }
    } catch (e) {
        errorHandler(res, e)
    }
}
