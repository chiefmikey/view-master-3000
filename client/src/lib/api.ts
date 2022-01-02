import Snoowrap from 'snoowrap';

import token from '../../../token';

const r = token
  ? new Snoowrap({
      userAgent: token.userAgent,
      clientId: token.clientId,
      clientSecret: token.clientSecret,
      username: token.username,
      password: token.password,
    })
  : new Snoowrap({
      userAgent: 'put your user-agent string here',
      clientId: 'put your client id here',
      clientSecret: 'put your client secret here',
      refreshToken: 'put your refresh token here',
    });

export default r;
