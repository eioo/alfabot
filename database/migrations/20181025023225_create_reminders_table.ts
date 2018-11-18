import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('reminders', table => {
    table.increments();
    table.integer('chatid').notNullable();
    table.bigInteger('timestamp').notNullable();
    table.string('text', 25550).notNullable();
    table.string('askername').notNullable();
    table.bigInteger('askerid').notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('reminders');
};
