import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';

dotenv.config();

const r = new Snoowrap({
  userAgent: process.env.USER_AGENT || '',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

export default r;
