import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import r from '../lib/api';

export const getUserSubmissions = async (user: string) => {
  try {
    return await r.getUser(user).getSubmissions({ limit: 128 });
  } catch {
    return [];
  }
};

export const getTopSubmissions = async (sub: string, time: Timespan) => {
  try {
    return await r.getSubreddit(sub).getTop({ time, limit: 128 });
  } catch {
    return [];
  }
};

export const getNewSubmissions = async (sub: string) => {
  try {
    return await r.getSubreddit(sub).getNew({ limit: 128 });
  } catch {
    return [];
  }
};

export const getHotSubmissions = async (sub: string) => {
  try {
    return await r.getSubreddit(sub).getHot({ limit: 128 });
  } catch {
    return [];
  }
};

export const getRisingSubmissions = async (sub: string) => {
  try {
    return await r.getSubreddit(sub).getRising({ limit: 128 });
  } catch {
    return [];
  }
};

export const getControversialSubmissions = async (sub: string) => {
  try {
    return await r.getSubreddit(sub).getControversial({ limit: 128 });
  } catch {
    return [];
  }
};
