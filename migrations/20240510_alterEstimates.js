exports.up = function(knex) {
    return Promise.all([
      knex.schema.alterTable('estimate', function(table) {
        table.datetime('finishDate');
        table.string('authenticationCode');
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.alterTable('estimate', function(table) {
        table.dropColumn('authenticationCode');
        table.dropColumn('finishDate');
      })
    ]);
  };
  