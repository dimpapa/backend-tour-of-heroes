'use strict'

const db = require("../../library/knex");
const net = require("../../library/network");

async function deleteHero(req, res, next)
{
    console.debug("Heroes.Delete");

    try {
        const data = await db("tblHeroes").where('id', req.params.id).del();
        console.debug(data);
        net.replyData({ res, httpMethod: net.Method.DELETE, httpStatus: 201, data: [data],
            message: (data === 0) ? "Not deleted" : "Ok"
        });

    } catch (error) {
        console.error(error);
        net.replyError({ res, httpMethod: net.Method.DELETE, httpStatus: 400, error });
    }

}

module.exports = {
    oneById: deleteHero,
}
