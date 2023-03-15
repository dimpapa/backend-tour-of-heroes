'use strict'

const db = require("../../library/knex");
const net = require("../../library/network");

async function updateHero(req, res, next)
{
    console.debug("Heroes.Update");
    console.debug(req.params);
    console.debug(req.body);

    try {
        const data = await db("tblHeroes").where({id: +req.params.id}).update({name: req.body.name});
        console.debug(data);
        net.replyData({ res, httpMethod: net.Method.PATCH, httpStatus: 201, data: [data],
            message: (data === 0) ? "No Data" : "Ok"
        });

    } catch (error) {
        console.error(error);
        net.replyError({ res, httpMethod: net.Method.PATCH, httpStatus: 400, error });
    }

}

module.exports = {
    oneById: updateHero,
}
