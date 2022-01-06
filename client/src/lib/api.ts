import Snoowrap from 'snoowrap';

import auth from './auth';

const r = new Snoowrap({
  userAgent: 'View-Master 3000',
  accessToken: await auth(),
});

export default r;
