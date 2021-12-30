import {
  getHotSubmissions,
  getRisingSubmissions,
  getControversialSubmissions,
  getTopSubmissions,
} from '../requests/getSubmissions';

import filter from './filter';

const responseFunctions = [
  getHotSubmissions,
  getRisingSubmissions,
  getControversialSubmissions,
];
let response;
let responseIndex = 0;
const tops = ['hour', 'day', 'week', 'month', 'year', 'all'];
let topIndex = 0;

const continueRun = async (windowOwner) => {
  if (responseIndex === responseFunctions.length) {
    response = await getTopSubmissions(windowOwner[1], tops[topIndex]);
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
