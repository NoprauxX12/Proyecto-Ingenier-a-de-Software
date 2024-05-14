exports.up = function(knex) {
    return Promise.all([
      knex.schema.dropTableIfExists('review'),
      knex.schema.dropTableIfExists('contract')
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.createTable('estimate', function(table) {
        table.integer('estimateId').notNullable();
        // Aquí irían las columnas restantes de la tabla estimate
        table.primary('estimateId');
      }),
      knex.schema.createTable('review', function(table) {
        table.integer('estimateId').notNullable();
        // Aquí irían las columnas restantes de la tabla review
        table.primary('estimateId');
        table.index('estimateId');
        table.foreign('estimateId').references('estimate.estimateId');
      })
    ]);
  };
  