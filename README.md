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

| Key                | Explanation                                    |
| ------------------ | ---------------------------------------------- |
| PG_HOST            | PostgreSQL host                                |
| PG_DATABASE        | PostgreSQL database name                       |
| PG_USER            | PostgreSQL username                            |
| PG_PASS            | PostgreSQL password                            |
| PANEL_HOST         | Panel host. Don't include leading/trailing "/" |
| WEBSERVER_PORT     | Port for Hapi server                           |
| BOT_TOKEN          | Your Telegram bot token                        |
| IBAN_NUMBERS       | IBAN account list for /iban command            |
| OPENWEATHERMAP_KEY | Your OpenWeatherMap API key                    |
| GIPHY_KEY          | Your Giphy API key                             |
| YOUTUBEV3_KEY      | Your Youtube V3 Data API key                   |

- IBAN accounts are formatted like this:

`<accountName>:<accountNumber>` (each account splitted with semicolon)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
