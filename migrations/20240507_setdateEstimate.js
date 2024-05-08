exports.up = function(knex) {
    return knex.schema.alterTable('contractoffer', function(table) {
      table.timestamp('date').defaultTo(knex.fn.now()).alter();
    });
  };
  
  exports.down = function(knex) {
    // No necesitas un down en este caso, ya que estamos cambiando una alteración de la estructura de la tabla.
  };
  