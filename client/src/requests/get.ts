import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import r from '../lib/api';

const getTopSubmissions = async (sub: string, time: Timespan) => {
  try {
    const get = await r.getSubreddit(sub).getTop({ time });
    return get.fetchMore({ amount: 25 });
  } catch {
    return [];
  }
};

export default getTopSubmissions;
