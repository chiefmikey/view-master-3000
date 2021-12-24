import Snoowrap from 'snoowrap';

import token from '../../../token';

const r = new Snoowrap({
  userAgent: token.userAgent,
  clientId: token.clientId,
  clientSecret: token.clientSecret,
  username: token.username,
  password: token.password,
});

export default r;
