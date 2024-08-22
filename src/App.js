import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { predictFlightDelay, getAccuracyData } from './services/api';
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
  const [weekday, setWeekday] = useState('');
  const [airline, setAirline] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
  const [originAltimeter, setOriginAltimeter] = useState('');
  const [destinationAltimeter, setDestinationAltimeter] = useState('');
  const [originDewPoint, setOriginDewPoint] = useState('');
  const [destinationDewPoint, setDestinationDewPoint] = useState('');
  const [originPressure, setOriginPressure] = useState('');
  const [destinationPressure, setDestinationPressure] = useState('');
  const [originWetBulb, setOriginWetBulb] = useState('');
  const [destinationWetBulb, setDestinationWetBulb] = useState('');
  const [originDryBulb, setOriginDryBulb] = useState('');
  const [destinationDryBulb, setDestinationDryBulb] = useState('');
  const [originHumidity, setOriginHumidity] = useState('');
  const [destinationHumidity, setDestinationHumidity] = useState('');
  const [originVisibility, setOriginVisibility] = useState('');
  const [destinationVisibility, setDestinationVisibility] = useState('');
  const [originWindSpeed, setOriginWindSpeed] = useState('');
  const [destinationWindSpeed, setDestinationWindSpeed] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handlePredictClick = async () => {
    const flightData = {
      // flight_number: 'AA123', // Replace with actual flight number or dynamic data
      origin,
      destination,
      weekday,
      airline,
      departureTime,
      arrivalTime,
      turnaroundTime,
      elapsedTime,
      originAltimeter,
      destinationAltimeter,
      originDewPoint,
      destinationDewPoint,
      originPressure,
      destinationPressure,
      originWetBulb,
      destinationWetBulb,
      originDryBulb,
      destinationDryBulb,
      originHumidity,
      destinationHumidity,
      originVisibility,
      destinationVisibility,
      originWindSpeed,
      destinationWindSpeed,
    };

    const result = await predictFlightDelay(flightData);
    setPrediction(result);
  };

  const route = origin && destination ? [airports[origin], airports[destination]] : [];

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          
          <div className="form-inputs" style={{ gridArea: 'input1' }}>
            <label>Origin:</label>
            <select onChange={(e) => setOrigin(e.target.value)}>
              <option value="">Select Origin</option>
              <option value="JFK">JFK</option>
              <option value="LAX">LAX</option>
              <option value="ORD">ORD</option>
              <option value="DFW">DFW</option>
            </select>
            <label>Destination:</label>
            <select onChange={(e) => setDestination(e.target.value)}>
              <option value="">Select Destination</option>
              <option value="JFK">JFK</option>
              <option value="LAX">LAX</option>
              <option value="ORD">ORD</option>
              <option value="DFW">DFW</option>
            </select>
            <label>Weekday:</label>
            <select onChange={(e) => setWeekday(e.target.value)}>
              <option value="">Select Weekday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <label>Airline:</label>
            <select onChange={(e) => setAirline(e.target.value)}>
              <option value="">Select Airline</option>
              <option value="AA">American Airlines</option>
              <option value="DL">Delta</option>
              <option value="UA">United Airlines</option>
              {/* Add more airlines */}
            </select>
          </div> 

          <div className="form-inputs" style={{ gridArea: 'input2' }}>
            <label>Scheduled Departure:</label>
            <input type="time" onChange={(e) => setDepartureTime(e.target.value)} />
            <label>Scheduled Arrival:</label>
            <input type="time" onChange={(e) => setArrivalTime(e.target.value)} />
            <label>Scheduled Turnaround Time:</label>
            <input type="number" placeholder="Minutes" onChange={(e) => setTurnaroundTime(e.target.value)} />
            <label>Scheduled Elapsed Time:</label>
            <input type="number" placeholder="Minutes" onChange={(e) => setElapsedTime(e.target.value)} />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input3' }}>
            <label>Origin Altimeter Setting:</label>
            <input type="number" placeholder="Setting" onChange={(e) => setOriginAltimeter(e.target.value)} />
            <label>Destination Altimeter Setting:</label>
            <input type="number" placeholder="Setting" onChange={(e) => setDestinationAltimeter(e.target.value)} />
            <label>Origin Dew Point Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setOriginDewPoint(e.target.value)} />
            <label>Destination Dew Point Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setDestinationDewPoint(e.target.value)} />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input4' }}>
            <label>Origin Station Pressure:</label>
            <input type="number" placeholder="Pressure" onChange={(e) => setOriginPressure(e.target.value)} />
            <label>Destination Station Pressure:</label>
            <input type="number" placeholder="Pressure" onChange={(e) => setDestinationPressure(e.target.value)} />
            <label>Origin Wet Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setOriginWetBulb(e.target.value)} />
            <label>Destination Wet Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setDestinationWetBulb(e.target.value)} />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input5' }}>
            <label>Origin Dry Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setOriginDryBulb(e.target.value)} />
            <label>Destination Dry Bulb Temperature:</label>
            <input type="number" placeholder="Temperature" onChange={(e) => setDestinationDryBulb(e.target.value)} />
            <label>Origin Relative Humidity:</label>
            <input type="number" placeholder="Humidity %" onChange={(e) => setOriginHumidity(e.target.value)} />
            <label>Destination Relative Humidity:</label>
            <input type="number" placeholder="Humidity %" onChange={(e) => setDestinationHumidity(e.target.value)} />
          </div>

          <div className="form-inputs" style={{ gridArea: 'input6' }}>
            <label>Origin Visibility:</label>
            <input type="number" placeholder="Visibility" onChange={(e) => setOriginVisibility(e.target.value)} />
            <label>Destination Visibility:</label>
            <input type="number" placeholder="Visibility" onChange={(e) => setDestinationVisibility(e.target.value)} />
            <label>Origin Wind Speed:</label>
            <input type="number" placeholder="Speed" onChange={(e) => setOriginWindSpeed(e.target.value)} />
            <label>Destination Wind Speed:</label>
            <input type="number" placeholder="Speed" onChange={(e) => setDestinationWindSpeed(e.target.value)} />
          </div>

          <div className="form-inputs" style={{ gridArea: 'map', margin: '20px'}}>
            <MapContainer center={[39.8283, -98.5795]} zoom={4} className="leaflet-container">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {route.length > 0 && <Polyline positions={route} color="red" />}
            </MapContainer>
          </div>

          <button type="button" className="predict-button" onClick={handlePredictClick}>
            Predict
          </button>

          {prediction && (
            <div className="prediction-result">
              <p>Prediction: {prediction.prediction}</p>
              <p>Probability: {prediction.probability}%</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

function Accuracy() {
  const [accuracyData, setAccuracyData] = useState([]);

  useEffect(() => {
    const fetchAccuracy = async () => {
      const data = await getAccuracyData();
      setAccuracyData(data);
    };

    fetchAccuracy();
  }, []);

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
            {accuracyData.map((item, index) => (
              <tr key={index}>
                <td>{item.model}</td>
                <td>{item.accuracy}%</td>
              </tr>
            ))}
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
