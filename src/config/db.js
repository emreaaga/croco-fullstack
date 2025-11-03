import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../models/index.js';
import { config } from './index.js';

const pool = new Pool({ connectionString: config.db.dbUrl });
export const db = drizzle(pool, { schema });
