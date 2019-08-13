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
          notifications: false,
          notificationTime: {
            hour: 7,
            minute: 0,
          },
        })
      )
      .notNullable();
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('chats');
};
