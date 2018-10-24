import * as Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('chats', table => {
    table
      .integer('chatid')
      .unique()
      .notNullable();
    table
      .jsonb('weather')
      .defaultTo(
        JSON.stringify({
          cities: [],
          enableNotifications: false,
        })
      )
      .notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('chats');
};
