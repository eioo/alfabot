# Alfabot

Telegram bot

## Installation & running

1. Import `./database/schema.sql` to your PostgreSQL database.

2. Make copy of `.env.example` to `.env`. Fill with your own details.

3. Run following commands:

```
yarn install
yarn start
```

## Environment variables

| Key                  | Explanation                         |
| -------------------- | ----------------------------------- |
| PG_HOST              | PostgreSQL host                     |
| PG_DATABASE          | PostgreSQL database name            |
| PG_USER              | PostgreSQL username                 |
| PG_PASS              | PostgreSQL password                 |
| BOT_TOKEN            | Your Telegram bot token             |
| OPENWEATHERMAP_TOKEN | Your OpenWeatherMap API token       |
| IBAN_NUMBERS         | IBAN account list for /iban command |

IBAN numbers are formatted followingly:

`<accountName>:<accountNumber>;<accountName>:<accountNumber>`

... and so on.
