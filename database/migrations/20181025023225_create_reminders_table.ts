import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('reminders', table => {
    table.increments();
    table
      .integer('chatid')
      .unique()
      .notNullable();
    table.integer('timestamp').notNullable();
    table.string('text').notNullable();
    table.string('asker').notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('reminders');
};
