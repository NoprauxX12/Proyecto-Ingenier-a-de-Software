exports.up = function(knex) {
    return knex.schema.alterTable('freelancer', function(table) {
      table.binary('curriculum');
      table.binary('eps');
      table.string('importantInfo', 250);
      table.string('tools', 255);
      table.string('preferredBrands', 255);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('freelancer', function(table) {
      table.dropColumn('curriculum');
      table.dropColumn('eps');
      table.dropColumn('importantInfo');
      table.dropColumn('tools');
      table.dropColumn('preferredBrands');
    });
  };

  