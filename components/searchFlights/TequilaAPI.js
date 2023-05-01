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

export const searchFlights = async (departure, arrival, dateFrom, dateTo, passengers) => {
    // const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${departure}&fly_to=${arrival}&date_from=${dateFrom}&date_to=${dateTo}&adults=${passengers}&max_stopovers=0`;
    // const url = `https://tequila-api.kiwi.com/v2/search?fly_from=MUC&fly_to=WAW&date_from=01/06/2023&date_to=01/06/2023&max_stopovers=0`;


    const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${getAirportCode(departure)}&fly_to=${getAirportCode(arrival)}&date_from=${dateFrom}&date_to=${dateFrom}&return_from=${dateTo}&return_to=${dateTo}&max_stopovers=0`;
    // const url = `https://tequila-api.kiwi.com/v2/search?fly_from=TLV&fly_to=AMS&date_from=&date_to=25/04/2023&return_from=25/04/2023&return_to=${dateTo}3&max_stopovers=0`;
    const headers = {
    'apikey': API_KEY,
    'content-type': 'application/json'
  };
  const response = await axios.get(url, { headers });
  console.log(response)
  const data = response.data;
  return data;
};


// function TequilaAPI() {
//     const [airports, setAirports] = useState([]);
//     const [flightData, setFlightData] = useState([]);

//     const logFunc = () => {
//         console.log(airports)
//         console.log(flightData)
//     }

//     const searchFlights = async (departure, arrival, dateFrom, dateTo, passengers) => {
//         const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${departure}&fly_to=${arrival}&date_from=${dateFrom}&date_to=${dateTo}&adults=${passengers}&max_stopovers=0`;
//         const headers = {
//             'apikey': API_KEY,
//             'content-type': 'application/json'
//         };
//         const response = await axios.get(url, { headers });
//         console.log(response)
//         let data = response.data;
//         setFlightData(data)
//         return(data)
//     };

//     return (
//         <div></div>
//     );
// }

// export default TequilaAPI;




// import React, { useState } from "react";
// import axios from 'axios';

// function TequilaAPI() {
//     const [airports, setAirports] = useState([]);
//     const [flightData, setFlightData] = useState([]);

//     const logFunc = () => {
//         console.log(airports)
//         console.log(flightData)
//     }
//     const API_KEY = 'bl5lLVmhEVhWoYFzIvOyPsCMdKdP48bV';

//     const searchFlights = async (departure, arrival, dateFrom, dateTo, passengers) => {
//         const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${departure}&fly_to=${arrival}&date_from=${dateFrom}&date_to=${dateTo}&adults=${passengers}&max_stopovers=0`;
//         const headers = {
//             'apikey': API_KEY,
//             'content-type': 'application/json'
//         };
//         const response = await axios.get(url, { headers });
//         console.log(response)
//         let data = response.data;
//         setFlightData(data)
//         return(data)
//     };

//     const fetchAirports = async () => {
//         const response = await axios.get('https://api.tequila.kiwi.com/locations/dump?locale=en-US&location_types=airport&limit=3500&sort=name&active_only=true', {
//             headers: {
//                 apikey: 'bl5lLVmhEVhWoYFzIvOyPsCMdKdP48bV',
//                 'content-type': 'application/json'
//             }
//         });
//         console.log(response)
//         setAirports(response.data.locations);
//         let data = response.data.locations
//         return(data)
//     };

//     // if (gotAllAirports) {
//     //     return (
//     //         <div>

//     //             <select>
//     //                 {airports.map((airport) => (
//     //                     <option key={airport.airport_int_id} value={airport.code}>
//     //                         {airport.name}, {airport.code}
//     //                     </option>
//     //                 ))}
//     //             </select>
//     //             <button onClick={searchFlights}>Search Flight</button>
//     //         </div>
//     //     );
//     // }
//     // else {
//     //     return (
//     //         <div>
//     //             <button onClick={fetchAirports}>Search Flight</button>
//     //         </div>
//     //     );
//     // }

// }


// export default TequilaAPI;
