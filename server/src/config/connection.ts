import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({ path: '.env' }); // Load environment variables from a .env file into process.env

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);
console.log(process.env.DB_NAME);
// Initialize a Sequelize instance to connect to the PostgreSQL database.
// If DB_URL is provided in the environment variables, use it directly.
// Otherwise, use individual environment variables for database name, user, and password.
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
    process.env.DB_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD, 
    {
      host: 'localhost',       // Database host
      // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3001,
      dialect: 'postgres',     // Database dialect (PostgreSQL)
      dialectOptions: {
        decimalNumbers: true,  // Ensure decimal numbers are handled correctly
      },
    });


// Function to get the authorization URL
export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar',
  });
}

// Function to set credentials (after obtaining them from OAuth flow)
export function setCredentials(tokens: any) {
  oauth2Client.setCredentials(tokens);
}

// Function to exchange the authorization code for tokens
export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  setCredentials(tokens);
  console.log(tokens);
  return tokens;
}

const calendarOAuth = oauth2Client;

export { sequelize, calendarOAuth };

