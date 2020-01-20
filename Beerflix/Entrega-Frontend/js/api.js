
const API_KEY = 'Q44RZ4M-2994445-Q2KNM97-QBSDHR7';

const api = (API_URL = 'https://beerflix-api.herokuapp.com/api/v1') => {
const searchAPIEndpoint = `${API_URL}/beers?search=`;
const beersAPIEndpoint = `${API_URL}/beers`;
return {
    getBeers: async text => {
      try {
        const URL = text ? `https://beerflix-api.herokuapp.com/api/v1/beers?search=${text}` : beersAPIEndpoint;
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
            'X-API-KEY': API_KEY
          }
        });
        if (!response.ok) {
          throw new Error('Error retrieving beers');
        }
        const data = await response.json();
        const beers = data.beers.map(result => {
          if(result.beer){
            return result.beer;
          }
          return result;
        });
        return beers;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
    getBeerDetail: id => {
      return fetch(`${beersAPIEndpoint}/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error retrieving beers ${id}`);
        }
        return response.json();
      })
      .catch(err => {
        console.log(err.message);
        throw err;
      });
    },
    getQuotes: async id => {
      try {
        const response = await fetch (`${API_URL}/quote/${id}`);
        if (!response.ok) {
          throw new Error('Error retrieving quotes');
        }
        const quotes = await response.json();
        return quotes;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createQuote: async (id, text) => {
      try {
        const response = await fetch (`${API_URL}/quote/${id}`, {
          method: 'POST',
          body: JSON.stringify({quote : text}),
          headers: {
            'Content-type': 'application/json',
            'X-API-KEY': API_KEY
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Error createQuote');
        }
        const responseBody = await response.json();
        return responseBody;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  };
};

export default api;

