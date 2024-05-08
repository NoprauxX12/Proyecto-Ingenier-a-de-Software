const knex= require("knex");

exports.up = function(knex) {
    return knex.schema.table('contractOffer', function(table) {
      table.string('adress').defaultTo('');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('contractOffer', function(table) {
      table.dropColumn("adress");
    });
  };
  