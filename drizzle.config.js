import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './src/config/index.js';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/models/application.model.js',
    './src/models/user.model.js',
    './src/models/token.model.js',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: config.db.dbUrl,
  },
});
