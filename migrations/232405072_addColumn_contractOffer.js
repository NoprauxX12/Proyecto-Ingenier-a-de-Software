const knex= require("knex");

exports.up = function(knex) {
    return knex.schema.table('contractOffer', function(table) {
      table.float("idCity").notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('contractOffer', function(table) {
      table.dropColumn('idCity');
    });
  };
  