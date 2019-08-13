import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'postgres',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASS || 'postgres',
  },

  panel: {
    host: process.env.PANEL_HOST || '127.0.0.1',
    port: Number(process.env.PANEL_PORT) || 1234,
  },

  api: {
    host: process.env.API_HOST || '127.0.0.1',
    port: Number(process.env.API_PORT) || 3000,
  },

  bot: {
    token: process.env.BOT_TOKEN || '',
    ibanNumbers: process.env.IBAN_NUMBERS || '',
    googleMapsKey: process.env.GOOGLE_MAPS_KEY || '',
    openWeatherMapKey: process.env.OPENWEATHERMAP_KEY || '',
    giphyKey: process.env.GIPHY_KEY || '',
    youtubeKey: process.env.YOUTUBEV3_KEY || '',
  },
};
