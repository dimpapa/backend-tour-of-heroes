'use strict'

const db = require("../../library/knex");
const net = require("../../library/network");

async function getAll(req, res, next)
{
    console.debug("Heroes.GetAll");

    try {
        const data = await db.select().from('tblHeroes');
        net.replyData({ res, httpMethod: net.Method.GET, httpStatus: 200, data,
            message: (data.length === 0) ? "No Data" : "Ok"
        });

    } catch (error) {
        console.error(error);
        net.replyError({ res, httpMethod: net.Method.GET, httpStatus: 404, error });
    }

}

async function getOneById(req, res, next)
{
    console.debug("Heroes.GetOneById", req.params);

    try {
        const data = await db.select().from("tblHeroes").where({id: req.params.id});

        net.replyData({res, httpMethod: net.Method.GET, httpStatus: 200, data,
            message: (data.length === 0) ? "No Data" : "Ok"
        });
    
    } catch (error) {
        console.error(error);
        net.replyError({ res, httpMethod: net.Method.GET, httpStatus: 404, error });
    }
}

module.exports = {
    published: getAll,
    oneById: getOneById,
};
