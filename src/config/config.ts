import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3001,
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
};

export default config;
