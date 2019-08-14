import { Client, QueryResult } from 'pg';

import { config } from '../shared/env';
import { IChatSettings, IReminder } from '../shared/types/database';

export const client = new Client(config.database);
client.connect();

export async function setup() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS chats (
      "chatid" bigint NOT NULL,
      "weather" jsonb DEFAULT '{"cities": [], "notifications": false, "notificationTime": {"hour": 12, "minute": 0}}'::jsonb NOT NULL,
      "schedules" jsonb DEFAULT '{"enabled": ["blazeit", "blazeit/warn", "mornings"]}'::jsonb NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS reminders (
      "id" SERIAL,
      "chatid" bigint NOT NULL,
      "timestamp" bigint NOT NULL,
      "text" character varying(255) NOT NULL,
      "askername" character varying(255) NOT NULL,
      "askerid" bigint NOT NULL
    );
  `);
}

export async function addNewChat(chatId: number) {
  return client.query(
    `INSERT INTO chats (chatid)
    VALUES ($1)
    ON CONFLICT DO NOTHING`,
    [chatId]
  );
}

export async function getAllChats(): Promise<IChatSettings[]> {
  const result = await client.query(`SELECT * FROM chats`);
  return result.rows;
}

export async function getChat(chatId: number): Promise<IChatSettings> {
  const result = await client.query(
    `SELECT * FROM chats 
    WHERE chatid = $1`,
    [chatId]
  );

  if (result.rowCount === 0) {
    await addNewChat(chatId);
    return getChat(chatId);
  }

  return result.rows[0];
}

export async function setChat({ chatid, schedules, weather }: IChatSettings) {
  // TODO: Not dynamic, at all
  return client.query(
    `
    UPDATE chats SET weather = $1, schedules = $2 WHERE chatid = $3
  `,
    [chatid, schedules, weather]
  );
}

export async function addReminder({
  chatid,
  timestamp,
  text,
  askername,
  askerid,
}: IReminder) {
  // TODO: Not dynamic, at all
  const result = await client.query(
    `
    INSERT INTO reminders
    (chatid, timestamp, text, askername, askerid)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [chatid, timestamp, text, askername, askerid]
  );

  return result.rows[0];
}

export async function getReminders(chatId?: number) {
  const now = +new Date();
  let result: QueryResult;

  if (chatId) {
    result = await client.query(
      `SELECT * FROM reminders 
      WHERE timestamp > $1
      AND chatid = $2`,
      [now, chatId]
    );
  } else {
    result = await client.query(
      `SELECT * FROM reminders 
      WHERE timestamp > $1`,
      [now]
    );
  }

  // TODO: Perform sorting with SQL
  return result.rows.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
}

export async function getReminderByID(
  reminderId: number
): Promise<IReminder | void> {
  const result = await client.query(
    `SELECT * FROM reminders
    WHERE id = $1`,
    [reminderId]
  );

  if (result.rowCount === 1) {
    return result.rows[0];
  }
}

export async function deleteReminder(reminderId: number) {
  return client.query(`DELETE FROM reminders WHERE id = $1`, [reminderId]);
}
