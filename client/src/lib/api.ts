import Snoowrap from 'snoowrap';

import auth from './auth';

const token = await auth();

console.log(token);
const r = new Snoowrap({
  userAgent: 'View-Master 3000',
  accessToken: token,
});
console.log(r);

export default r;
