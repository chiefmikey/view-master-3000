import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import r from '../lib/api';

const getTopSubmissions = async (sub: string, time: Timespan) => {
  try {
    return await r.getSubreddit(sub).getTop({ time, limit: 128 });
  } catch {
    return [];
  }
};

export default getTopSubmissions;
