/**
 * Query model
 */

const { pick } = require('lodash');

const Table = Object.freeze({
  Products: Symbol('Products'),
  Labels: Symbol('Labels'),
  Orders: Symbol('Orders'),
  Users: Symbol('Users')
 });

class Query {

  static from({args, table}) {

    let columns = [];
    let optionNames = ['limit'];

    console.debug('Query.from *** Start ***');
    console.debug('req.query:', args);


    switch (table) {
      case Table.Products:
        columns = ['id', 'name', 'description', 'price'];
        break;
      
      case Table.Orders:
        columns = ['id'];
        break;

      case Table.Users:
        columns = ['id'];        
        break;
      
      case Table.Labels:
        columns = ['id'];
        break;
            
      default:
        console.error('[W] Unknown table:', table);
        break;
    }
    
    const result = args ? pick(args, columns) : columns;
    console.debug('Query.columns:', result);
    console.debug('Query.options:', optionNames);
    console.debug('Query.from *** End ***');
    return {
      columns: result,
      options: pick(args, optionNames)
    };
  };
}

module.exports = { Query, Table };
