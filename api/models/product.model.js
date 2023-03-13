'use strict'
const table = 'Products';
const fields = ['product', 'description', 'price', 'isPublished'];

const ProductModel = {
    table,
    columns: ['id', ...fields, 'isDeleted'],
    queryPublished: {
        table,
        columns: ['id', ...fields],
        options: { 'isPublished': true, 'isDeleted': false },
        orderBy: [{column: 'product', order: 'asc'}]    
    },
    queryUnpublished: {
        table,
        columns: ['id', ...fields],
        options: { 'isPublished': false, 'isDeleted': false },
        orderBy: [{column: 'product', order: 'asc'}]    
    },
    queryDeleted: {
        table,
        columns: ['id', ...fields],
        options: { 'isDeleted': true },
        orderBy: [{column: 'product', order: 'asc'}]    
    },
    queryProduct: {
        table,
        columns: ['id', ...fields, 'isDeleted'],
        options: { },
        orderBy: []
    },
    updates: fields
};

module.exports = { ProductModel }
