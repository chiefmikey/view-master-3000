import axios from 'axios';

let token: { data: string };
const auth = async () => {
  try {
    if (!token) {
      token = await axios.get(
        'https://api.5105015032.com/auth/reddit/view-master-3000',
      );
    }
    if (token && token.data && token.data.length > 0) return token.data;
    return '';
  } catch (error) {
    console.log('Error getting token from auth api', error);
    return '';
  }
};

export default auth;
