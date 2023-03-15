'use strict'

const db = require("../../library/knex");
const net = require("../../library/network");

async function createHero(req, res, next)
{
    console.debug("Heroes.Create");

    try {
        const data = await db("tblHeroes").insert({
            id: +req.body.id,
            name: req.body.name,
        });
        console.debug(data);
        net.replyData({ res, httpMethod: net.Method.POST, httpStatus: 201, data,
            message: (data[0] === 0) ? "No Data" : "Ok"
        });

    } catch (error) {
        console.error(error);
        net.replyError({ res, httpMethod: net.Method.POST, httpStatus: 400, error });
    }

}

module.exports = {
    create: createHero,
}
