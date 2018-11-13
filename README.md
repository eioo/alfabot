# 🤖 Alfabot

Telegram bot. Beep Boop.

## Requirements

- Node.js
- PostgreSQL database

## Installation & running

1. Make copy of `.env.example` to `.env`. Fill it with your own details.
2. Run following commands:

```
npm install
npm run start
```

## Environment variables

| Key                  | Explanation                         |
| -------------------- | ----------------------------------- |
| PG_HOST              | PostgreSQL host                     |
| PG_DATABASE          | PostgreSQL database name            |
| PG_USER              | PostgreSQL username                 |
| PG_PASS              | PostgreSQL password                 |
| BOT_TOKEN            | Your Telegram bot token             |
| IBAN_NUMBERS         | IBAN account list for /iban command |
| OPENWEATHERMAP_TOKEN | Your OpenWeatherMap API token       |
| GIPHY_TOKEN          | Your Giphy API token                |

- IBAN accounts are formatted like this:

`<accountName>:<accountNumber>` (each account splitted with semicolon)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
