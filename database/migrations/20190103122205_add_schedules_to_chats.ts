import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.table('chats', table => {
    table
      .jsonb('schedules')
      .defaultTo(
        JSON.stringify({
          enabled: [],
        })
      )
      .notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.table('chats', table => {
    table.dropColumn('schedules');
  });
};
