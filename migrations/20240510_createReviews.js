exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('review', function(table) {
      table.integer('estimateId').notNullable();
      table.enum('clientScore', ['0', '1', '2', '3', '4', '5']).nullable().defaultTo(null);
      table.string('clientComment', 45).nullable().defaultTo(null);
      table.primary('estimateId');
      table.index('estimateId');
      table.foreign('estimateId').references('estimate.estimateId');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('review');
  };
  