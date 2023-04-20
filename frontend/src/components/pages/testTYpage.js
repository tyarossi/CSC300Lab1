import React, {useState, useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import { UserContext } from '../../App';


const Test = () => {
    // const [user, setUser] = useState(null)
    const value = useContext(UserContext)

    document.addEventListener('DOMContentLoaded', () => {
      // Create the necessary HTML elements
      const body = document.body;
      const heading = document.createElement('h1');
      heading.textContent = 'MBTA Station Train Tracker';
      const select = document.createElement('select');
      select.id = 'stations';
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Select a station';
      select.appendChild(option);
      body.appendChild(heading);
      body.appendChild(select);
    
      // Make a GET request to retrieve the train stations from the MBTA API
      fetch('https://api-v3.mbta.com/stops?filter[route_type]=0')
        .then(response => response.json())
        .then(data => {
          // Loop through the train stations and add them to the dropdown list
          const stationsDropdown = document.getElementById('stations');
          data.data.forEach(station => {
            const option = document.createElement('option');
            option.value = station.id;
            option.textContent = station.attributes.name;
            stationsDropdown.appendChild(option);
          });
    
          // Create the 'go' button after the dropdown has been populated
          const goButton = document.createElement('button');
          goButton.textContent = 'Go';
          body.appendChild(goButton);
    
          // Add an event listener to the 'go' button
          goButton.addEventListener('click', event => {
            const stationId = document.getElementById('stations').value;
            if (stationId) {
              const url = `https://api-v3.mbta.com/predictions?filter[stop]=${stationId}&sort=time`;
              fetch(url)
                .then(response => response.json())
                .then(data => {
                  const url2 = `https://api-v3.mbta.com/alerts?filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE&filter%5Bfacility%5D=${stationId}`;
                  fetch(url2)
                    .then(response => response.json())
                    .then(data => {
                      // Remove any existing list of incoming trains
                      const existingList = document.getElementById('incoming-trains');
                      if (existingList) {
                        existingList.remove();
                      }
        
                      // Display the incoming trains for the selected station
                      const predictions = data.data;
                      const stationName = predictions[0].relationships.stop.data.id;
                      const delays = alert[0].relationships.stop.data.id;
                      const heading = document.createElement('h2');
                      heading.textContent = `Incoming Trains for ${stationName}`;
                      const list = document.createElement('ul');
                      list.id = 'incoming-trains';
                      // loop through incoming trains and give arrival time, train ID and heading
                      predictions.forEach(prediction => {
                        const arrivalTime = new Date(prediction.attributes.arrival_time);
                        const trainId = new String(prediction.relationships.route.data.id);
                        const directionId = prediction.attributes.direction_id;

                        const inOrOutb = ["Outbound", "Inbound"];
                        const listItem = document.createElement('li');
                        listItem.textContent = `${trainId} Train arriving at ${arrivalTime.toLocaleTimeString()} heading ${inOrOutb[directionId]}`;
                        list.appendChild(listItem);
                        delays.forEach(delays => {
                          const delay = alert.attributes.short_header;
                          listItem.textContent = '${delay}';
                          list.appendChild(listItem);
                        })
                      });

                      const container = document.createElement('div');
                      container.appendChild(heading);
                      container.appendChild(list);
                      body.appendChild(container);
                    })
                    .catch(error => console.error(error));
                  });
            }
          });
        })
        .catch(error => console.error(error));
    });
    console.log(value)

}

export default Test