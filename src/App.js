import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import oracleLogo from './ologo.png';

const airports = {
  "JFK": [40.6413, -73.7781],
  "LAX": [33.9416, -118.4085],
  "ORD": [41.9742, -87.9073],
  "DFW": [32.8998, -97.0403]
  // Add more airport codes and their lat/lng coordinates
};

function Predict() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const route = origin && destination ? [airports[origin], airports[destination]] : [];

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          {/* First Row */}
          <div className="form-inputs" style={{ gridArea: 'input1' }}>
            <label>Origin:</label>
            <select onChange={handleOriginChange}>
              <option value="">Select Origin</option>
              <option value="JFK">JFK</option>
              <option value="LAX">LAX</option>
              <option value="ORD">ORD</option>
              <option value="DFW">DFW</option>
            </select>
            <label>Destination:</label>
            <select onChange={handleDestinationChange}>
              <option value="">Select Destination</option>
              <option value="JFK">JFK</option>
              <option value="LAX">LAX</option>
              <option value="ORD">ORD</option>
              <option value="DFW">DFW</option>
            </select>
            <label>Weekday:</label>
            <select>
              <option value="Weekday">Weekday</option>
            </select>
            <label>Airline:</label>
            <select>
              <option value="Airline">Airline</option>
            </select>
          </div> 

          <div className="form-inputs" style={{ gridArea: 'input2' }}>
            <label>Scheduled Departure:</label>
            <input type="time" />
            <label>Scheduled Arrival:</label>
            <input type="time" />
            <label>Scheduled Turnaround Time:</label>
            <input type="number" placeholder="Minutes" />
            <label>Scheduled Elapsed Time:</label>
            <input type="number" placeholder="Minutes" />
          </div>


          <div className="form-inputs" style={{ gridArea: 'input3' }}>
            <label>Origin Altimeter Setting:</label>
            <input type="number" placeholder="Setting" />
            <label>Destination Altimeter Setting:</label>
            <input type="number" placeholder="Setting" />
            <label>Origin Dew Point Temperature:</label>
            <input type="number" placeholder="Temperature" />
            <label>Destination Dew Point Temperature:</label>
            <input type="number" placeholder="Temperature" />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input4' }}>
            <label>Origin Station Pressure:</label>
            <input type="number" placeholder="Pressure" />
            <label>Destination Station Pressure:</label>
            <input type="number" placeholder="Pressure" />
            <label>Origin Wet Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" />
            <label>Destination Wet Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input5' }}>
            <label>Origin Dry Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" />
            <label>Destination Dry Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" />
            <label>Origin Relative Humidity:</label>
            <input type="number" placeholder="Humidity %" />
            <label>Destination Relative Humidity:</label>
            <input type="number" placeholder="Humidity %" />
          </div>


          <div className="form-inputs" style={{ gridArea: 'input6' }}>
            <label>Origin Visibility:</label>
            <input type="number" placeholder="Visibility" />
            <label>Destination Visibility:</label>
            <input type="number" placeholder="Visibility" />
            <label>Origin Wind Speed:</label>
            <input type="number" placeholder="Speed" />
            <label>Destination Wind Speed:</label>
            <input type="number" placeholder="Speed" />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input7' }}>

          </div>

          {/* Map */}
          <div className="form-inputs" style={{ gridArea: 'map', margin: '20px'}}>
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              className="leaflet-container"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {route.length > 0 && (
                <Polyline positions={route} color="red" />
              )}
            </MapContainer>
          </div>

          {/* Predict Button */}
          <button type="submit" className="predict-button">Predict</button>
        </div>
      </header>
    </div>
  );
}



function Accuracy() {
  return (
    <div className="accuracy-page">
      <div className="table-container">
        <h2>Table of Flights with Their Features</h2>
        <table className="flights-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Date</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Scheduled Departure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AA123</td>
              <td>2024-08-15</td>
              <td>JFK</td>
              <td>LAX</td>
              <td>10:00 AM</td>
            </tr>
            <tr>
              <td>DL456</td>
              <td>2024-08-15</td>
              <td>ORD</td>
              <td>DFW</td>
              <td>12:00 PM</td>
            </tr>
            <tr>
              <td>UA789</td>
              <td>2024-08-15</td>
              <td>DFW</td>
              <td>JFK</td>
              <td>02:00 PM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="model-predictions-container">
        <h2>Model Predictions</h2>
        <table className="predictions-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Prediction</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AA123</td>
              <td>On Time</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>DL456</td>
              <td>Delayed</td>
              <td>75%</td>
            </tr>
            <tr>
              <td>UA789</td>
              <td>Delayed</td>
              <td>65%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="accuracy-container">
        <h2>Our Accuracy Across All Flights</h2>
        <table className="accuracy-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model A</td>
              <td>90%</td>
            </tr>
            <tr>
              <td>Model B</td>
              <td>85%</td>
            </tr>
            <tr>
              <td>Model C</td>
              <td>80%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="header-bar">
        <img src={oracleLogo} alt="Oracle Logo" className="logo" />
        <nav>
          <ul>
            <li><Link to="/">Predict</Link></li>
            <li><Link to="/accuracy">Accuracy</Link></li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Predict />} />
        <Route path="/accuracy" element={<Accuracy />} />
      </Routes>
    </Router>
  );
}

export default App;