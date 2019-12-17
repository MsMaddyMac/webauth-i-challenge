
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl
        .string('username', 128)
        .notNullable()
        .unique();

      tbl.string('password', 128).notNullable();

      tbl
        .integer('role_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
