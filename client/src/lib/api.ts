import Snoowrap from 'snoowrap';

import token from '../../../token';

// if (process.env.NODE_ENV !== 'production') {
//   await import('../../../token');
// }

const r =
  process.env.NODE_ENV !== 'production'
    ? await new Snoowrap({
        userAgent: token.userAgent || '',
        clientId: token.clientId,
        clientSecret: token.clientSecret,
        username: token.username,
        password: token.password,
      })
    : new Snoowrap({
        userAgent: 'View-Master 3000',
        accessToken: '',
      });

export default r;
