import axios from 'axios';

const KEYS = [
  'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg',
  'EBKbZeQ1QlE4N1xuBzgec08s0dcltdnt',
  'LHyEVqpqH3XRadXJj1w6rv0a0ZohndJk',
  'cA7VAi6BkNhnUsbkr3MbzXEpvHcHoY0s',
  '0hyoTxwjkFGnBVwxpqUlTmvzI4cZxyf4',
  'EGjEucB0gMPAFV2qxqAOGF9D3c1gC1uL',
  'aKKbrKpe1YGi66K7WzFvajOaocjKPkWa',
  'H3FRH5IMtPz0yNN170uMkDXY0wt0kfbS',
  'a9ln0xE0xoZg0UKIfadTWG9XvaVU3VY0',
  'T9gT3cF0WPsOQPyLn0p0McCuVRVQEnDR'
];
function getKey() {
  return KEYS[Math.round(Math.random() * (KEYS.length - 1))]
}

// const KEY = 'ExFFGvT2fZBzTdDFtfXKysgryhCLXIkg';

export async function getCategoriesAPI() {
  const KEY = getKey()
  const BASE_URL =
    'https://api.nytimes.com/svc//news/v3/content/section-list.json';

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryNewsAPI(category, offset) {
  const KEY = getKey()
  const BASE_URL = `https://api.nytimes.com/svc//news/v3/content/all/${category}.json`;

  try {
    const response = await axios.get(
      `${BASE_URL}?api-key=${KEY}&limit=500&${offset}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPopularNewsAPI() {
  const KEY = getKey()
  const BASE_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json`;

  try {
    const response = await axios.get(`${BASE_URL}?api-key=${KEY}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchNewsAPI(searchTerm) {
  const KEY = getKey()
  const BASE_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${searchTerm}&api-key=${KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
