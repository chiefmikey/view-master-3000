import Snoowrap from 'snoowrap';

import auth from './auth';

const token = await auth();

const r = new Snoowrap({
  userAgent: 'View-Master 3000',
  accessToken: token,
});

export default r;
