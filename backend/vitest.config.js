import 'dotenv/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    // All test files share one database, so run them one after another
    fileParallelism: false,
    env: {
      VITEST: 'true',
      DATABASE_URL: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'test_access_secret',
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'test_refresh_secret',
      ACCESS_TOKEN_EXPIRES_IN: '15m',
      REFRESH_TOKEN_EXPIRES_IN: '7d',
      CLIENT_URL: 'http://localhost:5173',
      NODE_ENV: 'test',
      APP_TIMEZONE: 'Asia/Kolkata',
      BCRYPT_SALT_ROUNDS: '4',
    },
  },
});
