# 🤖 Alfabot

Telegram bot. Beep Boop.

## Requirements

- Node.js
- PostgreSQL (>= 9.1) database
- Buckets worth of API keys

## Installation & running

1. Make copy of `.env.example` to `.env`. Fill it with your own details.
2. Run following commands:

```
npm install
npm run start
```

Database is created automatically.

## Development mode

```
npm run [dev|dev:bot|dev:web]
```

## Environment variables

| Key                | Explanation                                    |
| ------------------ | ---------------------------------------------- |
| PG_HOST            | PostgreSQL host                                |
| PG_PORT            | PostgreSQL port                                |
| PG_DATABASE        | PostgreSQL database name                       |
| PG_USER            | PostgreSQL username                            |
| PG_PASS            | PostgreSQL password                            |
| PANEL_HOST         | Panel host, don't include leading/trailing "/" |
| PANEL_PORT         | Panel port                                     |
| API_HOST           | Host for WebSocket API                         |
| API_PORT           | Port for WebSocket API                         |
| BOT_TOKEN          | Your Telegram bot token                        |
| GOOGLE_MAPS_KEY    | Your Google Maps API key (For web panel)       |
| OPENWEATHERMAP_KEY | Your OpenWeatherMap API key                    |
| GIPHY_KEY          | Your Giphy API key                             |
| YOUTUBEV3_KEY      | Your Youtube V3 Data API key                   |
| IBAN_NUMBERS       | IBAN account list for /iban command            |

- IBAN accounts are formatted like this:

`<accountName>:<accountNumber>` (each account splitted with semicolon)

## Roadmap

- [x] Remove `lodash` dependency (?)
- [x] Replace `knex` and `pg` with ~~[slonik](https://github.com/gajus/slonik)~~ (No TypeScript support) `node-postgres`
- [x] Remove `cheerio` dependency
- [ ] Make `/remind` command accept dates with/instead of durations
- [ ] Revamp database schema
- [ ] Improve web panel (Schedule settings with cron selector, chat city selector, ability to edit reminds)
- [ ] Replace `signale` logger with something more lightweight
- [ ] Add ability to add / remove IBAN numbers with `/iban` command

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
