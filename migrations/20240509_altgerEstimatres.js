const knex= require("knex");

exports.up = function(knex) {
    return knex.schema.table('messages', function(table) {
      table.boolean("visto");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('messages', function(table) {
      table.boolean('visto');
    });
  };
  