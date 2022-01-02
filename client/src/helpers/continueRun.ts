import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import {
  getHotSubmissions,
  getRisingSubmissions,
  getControversialSubmissions,
  getTopSubmissions,
} from '../requests/getSubmissions';

const responseFunctions = [
  getHotSubmissions,
  getRisingSubmissions,
  getControversialSubmissions,
];
let response: RedditResponseType = [];
let responseIndex = 0;
const tops = ['hour', 'day', 'week', 'month', 'year', 'all'];
let topIndex = 0;

const continueRun = async (windowOwner: string[]) => {
  if (responseIndex === responseFunctions.length) {
    response = await getTopSubmissions(
      windowOwner[1],
      tops[topIndex] as Timespan,
    );
    if (topIndex === tops.length - 1) {
    } else {
      topIndex += 1;
    }
  } else {
    response = await responseFunctions[responseIndex](windowOwner[1]);
    responseIndex += 1;
  }
  return response;
};

export default continueRun;
