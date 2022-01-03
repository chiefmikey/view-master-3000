import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const r = process.env
  ? new Snoowrap({
      userAgent: process.env.userAgent || '',
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      username: process.env.username,
      password: process.env.password,
    })
  : new Snoowrap({
      userAgent: 'View-Master 3000',
      accessToken: '',
    });

export default r;
