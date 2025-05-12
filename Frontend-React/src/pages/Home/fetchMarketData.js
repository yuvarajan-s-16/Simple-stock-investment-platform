import axios from 'axios';
export const dataType="Time Series (Daily)"
const fetchData = async (keyword,symbol) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: keyword,
        symbol: symbol,
        apikey: 'my api keyd', // Replace 'demo' with your actual API key
        market:"EUR"
      }
    });

    // Check if data was retrieved successfully
    if (response.status === 200) {
      return response.data; // Return the data
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null if there's an error
  }
};

export default fetchData;
