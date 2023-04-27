import React, {useState, useEffect, useContext} from 'react';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import { UserContext } from '../../App';
document.body.style.background = localStorage.getItem("bgColor")

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
        .then(data1 => {
          // Loop through the train stations and add them to the dropdown list
          const stationsDropdown = document.getElementById('stations');
          data1.data.forEach(station => {
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
              const predictionsGet = `https://api-v3.mbta.com/predictions?filter[stop]=${stationId}&sort=time`;
              fetch(predictionsGet)
                .then(response => response.json())
                .then(data2 => {
                  const alertsGet = `https://api-v3.mbta.com/alerts?filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE&filter%5Bstop%5D=${stationId}`;
                        fetch(alertsGet)
                          .then(response => response.json())
                          .then(data3 => {
                      // Remove any existing list of incoming trains
                      const existingList = document.getElementById('incoming-trains');
                      if (existingList) {
                        existingList.remove();
                      }
        
                      // Display the incoming trains for the selected station
                      const predictions = data2.data;
                      const stationName = predictions[0].relationships.route.data.id;                     

                            const list = document.createElement('ul');
                            list.id = 'incoming-trains';
                            // loop through incoming trains and give arrival time, train ID and heading
                            const alerts= data3.data;
                            const delays = alerts[0].attributes.header;
                          //  const heading = document.createElement('h3');
                            heading.textContent = `Delays: ${delays}`;
                                
                            predictions.forEach(prediction => {
                              const arrivalTime = new Date(prediction.attributes.arrival_time);
                              const trainId = new String(prediction.relationships.vehicle.data.id);
                              const directionId = prediction.attributes.direction_id;
                              const iHateMBTA = `https://api-v3.mbta.com/vehicles?filter%5Bid%5D=${stationId}`;
                                fetch(iHateMBTA)
                                  .then(response => response.json())
                                  .then(data4 =>{
                                    const inOrOutb = ["Outbound", "Inbound"];
                                    const listItem = document.createElement('li');
                                    listItem.textContent = `${trainId} Train arriving at ${arrivalTime.toLocaleTimeString()} heading ${inOrOutb[directionId]}`;
                                       
                                    list.appendChild(listItem);
                                  })
                            })

                            const container = document.createElement('div');
                            container.appendChild(heading);
                            container.appendChild(list);
                            body.appendChild(container);
                          })
                    
                  })
            
          }
        })
        .catch(error => console.error(error));
    });
    console.log(value)

})
}

export default Test