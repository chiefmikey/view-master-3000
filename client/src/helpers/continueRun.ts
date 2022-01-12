import axios from 'axios';

const responseFunctions = ['hot', 'rising', 'controversial', 'new'];
let response: { data: RedditResponseType } = { data: [] };
let responseIndex = 0;
const tops = ['hour', 'day', 'week', 'month', 'year', 'all'];
let topIndex = 0;

const continueRun = async (windowOwner: string[]) => {
  if (responseIndex === responseFunctions.length) {
    response = await axios.get('https://api.5105015032.com/auth/vm3000/top', {
      params: { subName: windowOwner[1], time: tops[topIndex] },
    });
    if (topIndex === tops.length - 1) {
    } else {
      topIndex += 1;
    }
  } else {
    response = await axios.get(
      `https://api.5105015032.com/auth/vm3000/${responseFunctions[responseIndex]}`,
      {
        params: { subName: windowOwner[1] },
      },
    );
    responseIndex += 1;
  }
  return response.data;
};

export default continueRun;
