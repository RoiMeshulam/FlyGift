import axios from 'axios';

const API_KEY = 'bl5lLVmhEVhWoYFzIvOyPsCMdKdP48bV';

export const fetchAirports = async () => {
  const response = await axios.get('https://api.tequila.kiwi.com/locations/dump?locale=en-US&location_types=airport&limit=3500&sort=name&active_only=true', {
    headers: {
      apikey: API_KEY,
      'content-type': 'application/json'
    }
  });
  console.log(response)
  const data = response.data.locations
  return data;
};

function getAirportCode(str) {
  const airportCode = str.split(',')[0];
  return airportCode;
}
export const searchFlightsTwoDirection = async (departure, arrival, dateFrom, dateTo, passengers) => {
  const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${getAirportCode(departure)}&fly_to=${getAirportCode(arrival)}&date_from=${dateFrom}&date_to=${dateFrom}&return_from=${dateTo}&return_to=${dateTo}&max_stopovers=0&adults=${passengers}`;
  const headers = {
  'apikey': API_KEY,
  'content-type': 'application/json'
};
const response = await axios.get(url, { headers });
const data = response.data;
return data;
};

export const searchFlightsOneDirection = async (departure, arrival, dateFrom, dateTo, passengers) => {
  const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${getAirportCode(departure)}&fly_to=${getAirportCode(arrival)}&date_from=${dateFrom}&date_to=${dateFrom}&max_stopovers=0&adults=${passengers}`;
  const headers = {
  'apikey': API_KEY,
  'content-type': 'application/json'
};
const response = await axios.get(url, { headers });
const data = response.data;
return data;
};

