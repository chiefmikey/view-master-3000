import axios from 'axios';

const responseFunctions = ['hot', 'rising', 'controversial', 'new'];
let response: { data: RedditResponseType } = { data: [] };
let responseIndex = 0;
const tops = ['hour', 'day', 'week', 'month', 'year', 'all'];
let topIndex = 0;

const continueRun = async (windowOwner: string[]) => {
  try {
    if (!responseFunctions[responseIndex] && tops[topIndex]) {
      response = await axios.get('https://api.5105015032.com/auth/vm3000/top', {
        params: { subName: windowOwner[1], time: tops[topIndex] },
      });
      topIndex += 1;
    } else if (responseFunctions[responseIndex]) {
      response = await axios.get(
        `https://api.5105015032.com/auth/vm3000/${responseFunctions[responseIndex]}`,
        {
          params: { subName: windowOwner[1] },
        },
      );
      responseIndex += 1;
    }
    if (response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default continueRun;
