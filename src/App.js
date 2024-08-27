import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import oracleLogo from './ologo.png';
import image1 from './image1.jpg';
import image2 from './image2.png';
import image3 from './image3.jpg';
import image4 from './image4.png';

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [weather, setWeather] = useState({
    temperature: '',
    humidity: '',
    windSpeed: ''
  });
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weekday, setWeekday] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');

  const [modelResult, setModelResult] = useState('');
  const [shapValues, setShapValues] = useState('');
  const [insights, setInsights] = useState('');
  const [showMoreAirline, setShowMoreAirline] = useState(false);
  const [showMoreWeather, setShowMoreWeather] = useState(false);

  const route = [
    [40.6413, -73.7781], 
    [33.9416, -118.4085]
  ];

  useEffect(() => {
    if (step === 1) {
      const data = {
        airline: 'Delta Airlines',
        flightNumber: 'DL1234',
      };
      setAirline(data.airline);
      setFlightNumber(data.flightNumber);
    }

    if (step === 2) {
      const data = {
        airline: 'Delta Airlines',
        flightNumber: 'DL1234',
        origin: 'JFK',
        destination: 'LAX',
        weekday: 'Monday',
        departureTime: '10:00',
        arrivalTime: '13:00',
        turnaroundTime: '45',
        elapsedTime: '180',
        weather: {
          temperature: '72°F',
          humidity: '50%',
          windSpeed: '10 mph'
        }
      };
      setAirline(data.airline);
      setFlightNumber(data.flightNumber);
      setOrigin(data.origin);
      setDestination(data.destination);
      setWeekday(data.weekday);
      setDepartureTime(data.departureTime);
      setArrivalTime(data.arrivalTime);
      setTurnaroundTime(data.turnaroundTime);
      setElapsedTime(data.elapsedTime);
      setWeather(data.weather);
    }

    if (step === 3) {
      const data = {
        modelResult: 'On-time prediction: 85%',
        shapValues: 'Feature 1: +0.3 | Feature 2: -0.2'
      };
      setModelResult(data.modelResult);
      setShapValues(data.shapValues);
    }

    if (step === 4) {
      const data = {
        insights: 'Consider adjusting your schedule to avoid peak weather conditions and reduce turnaround time for better on-time performance.'
      };
      setInsights(data.insights);
    }
  }, [step]);

  useEffect(() => {
    if (showMoreAirline) {
      const data = {
        weekday: 'Monday',
        departureTime: '10:00',
        arrivalTime: '13:00',
        turnaroundTime: '45',
        elapsedTime: '180',
      };
      setWeekday(data.weekday);
      setDepartureTime(data.departureTime);
      setArrivalTime(data.arrivalTime);
      setTurnaroundTime(data.turnaroundTime);
      setElapsedTime(data.elapsedTime);
    }
  }, [showMoreAirline]);

  useEffect(() => {
    if (showMoreWeather) {
      const data = {
        originAltimeter: '30.00',
        destinationAltimeter: '29.92',
        originDewPoint: '65°F',
        destinationDewPoint: '60°F',
        originStationPressure: '1015 mb',
        destinationStationPressure: '1013 mb',
        originWetBulb: '67°F',
        destinationWetBulb: '63°F',
        originDryBulb: '70°F',
        destinationDryBulb: '68°F',
        originRelativeHumidity: '75%',
        destinationRelativeHumidity: '70%',
        originVisibility: '10 miles',
        destinationVisibility: '8 miles',
        originWindSpeed: '15 mph',
        destinationWindSpeed: '12 mph'
      };
      setWeather((prev) => ({
        ...prev,
        ...data
      }));
    }
  }, [showMoreWeather]);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="App">
      <header className="header-bar">
        <img src={oracleLogo} alt="Oracle Logo" className="oracle-logo" />
      </header>
      <div className="App-content">
        {step === 1 && (
          <div className="step-container page-1">
            <div className="image-placeholder">
              <img src={image1} alt="Image 1" className="circle-image" />
            </div>
            <div className="input-container">
              <input 
                type="text" 
                placeholder="Airline" 
                value={airline} 
                onChange={(e) => setAirline(e.target.value)} 
                className="input-field"
              />
              <input 
                type="text" 
                placeholder="Flight Number" 
                value={flightNumber} 
                onChange={(e) => setFlightNumber(e.target.value)} 
                className="input-field"
              />
              <button onClick={handleNextStep} className="get-flight-info-button">Get Flight Info</button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="step-container">
            <div className="image-placeholder">
              <img src={image2} alt="Image 2" className="circle-image" />
            </div>
            <div className="info-map-container">
              <div className="info-container">
                <div className="info-box">
                  <div className="info-header">
                    <h3 className="info-title">Airline Information</h3>
                    <button className="see-more-button" onClick={() => setShowMoreAirline(true)}>See More</button>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Airline</label>
                      <input
                        type="text"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        className="info-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Flight Number</label>
                      <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="info-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Origin</label>
                      <select
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="info-input"
                      >
                        <option value="">Select Origin</option>
                        <option value="JFK">JFK</option>
                        <option value="LAX">LAX</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Destination</label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="info-input"
                      >
                        <option value="">Select Destination</option>
                        <option value="JFK">JFK</option>
                        <option value="LAX">LAX</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Updated Weather Information container */}
                <div className="info-box weather-info-container">
                  <div className="info-header">
                    <h3>Weather Information</h3>
                    <button className="see-more-button" onClick={() => setShowMoreWeather(true)}>See More</button>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Temperature</label>
                      <input
                        type="text"
                        value={weather.temperature}
                        onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                        className="info-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Humidity</label>
                      <input
                        type="text"
                        value={weather.humidity}
                        onChange={(e) => setWeather({ ...weather, humidity: e.target.value })}
                        className="info-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Wind Speed</label>
                      <input
                        type="text"
                        value={weather.windSpeed}
                        onChange={(e) => setWeather({ ...weather, windSpeed: e.target.value })}
                        className="info-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="map-container">
                <MapContainer center={[39.8283, -98.5795]} zoom={4} className="leaflet-container">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Polyline positions={route} color="red" />
                </MapContainer>
              </div>
            </div>
            <div className="button-container">
              <button onClick={handleBackStep} className="back-button">Airline and Flight Number</button>
              <button onClick={handleNextStep} className="next-button">Model Results</button>
            </div>
          </div>
        )}

        {/* Popup for additional Airline Information fields */}
        {showMoreAirline && (
          <div className="popup-overlay" onClick={() => setShowMoreAirline(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>Additional Information</h3>
              <div className="input-row">
                <div className="input-group">
                  <label>Weekday</label>
                  <select
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value)}
                    className="info-input"
                  >
                    <option value="">Select Weekday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Scheduled Departure</label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Scheduled Arrival</label>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Turnaround Time</label>
                  <input
                    type="number"
                    value={turnaroundTime}
                    onChange={(e) => setTurnaroundTime(e.target.value)}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Elapsed Time</label>
                  <input
                    type="number"
                    value={elapsedTime}
                    onChange={(e) => setElapsedTime(e.target.value)}
                    className="info-input"
                  />
                </div>
              </div>
              <button className="close-popup-button" onClick={() => setShowMoreAirline(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Popup for additional Weather Information fields */}
        {showMoreWeather && (
          <div className="popup-overlay" onClick={() => setShowMoreWeather(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>Additional Weather Information</h3>
              <div className="input-row">
                <div className="input-group">
                  <label>Origin Altimeter Setting</label>
                  <input
                    type="text"
                    value={weather.originAltimeter || ''}
                    onChange={(e) => setWeather({ ...weather, originAltimeter: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Altimeter Setting</label>
                  <input
                    type="text"
                    value={weather.destinationAltimeter || ''}
                    onChange={(e) => setWeather({ ...weather, destinationAltimeter: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Origin Dew Point Temperature</label>
                  <input
                    type="text"
                    value={weather.originDewPoint || ''}
                    onChange={(e) => setWeather({ ...weather, originDewPoint: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Dew Point Temperature</label>
                  <input
                    type="text"
                    value={weather.destinationDewPoint || ''}
                    onChange={(e) => setWeather({ ...weather, destinationDewPoint: e.target.value })}
                    className="info-input"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Origin Station Pressure</label>
                  <input
                    type="text"
                    value={weather.originStationPressure || ''}
                    onChange={(e) => setWeather({ ...weather, originStationPressure: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Station Pressure</label>
                  <input
                    type="text"
                    value={weather.destinationStationPressure || ''}
                    onChange={(e) => setWeather({ ...weather, destinationStationPressure: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Origin Wet Bulb Temperature</label>
                  <input
                    type="text"
                    value={weather.originWetBulb || ''}
                    onChange={(e) => setWeather({ ...weather, originWetBulb: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Wet Bulb Temperature</label>
                  <input
                    type="text"
                    value={weather.destinationWetBulb || ''}
                    onChange={(e) => setWeather({ ...weather, destinationWetBulb: e.target.value })}
                    className="info-input"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Origin Dry Bulb Temperature</label>
                  <input
                    type="text"
                    value={weather.originDryBulb || ''}
                    onChange={(e) => setWeather({ ...weather, originDryBulb: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Dry Bulb Temperature</label>
                  <input
                    type="text"
                    value={weather.destinationDryBulb || ''}
                    onChange={(e) => setWeather({ ...weather, destinationDryBulb: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Origin Relative Humidity</label>
                  <input
                    type="text"
                    value={weather.originRelativeHumidity || ''}
                    onChange={(e) => setWeather({ ...weather, originRelativeHumidity: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Relative Humidity</label>
                  <input
                    type="text"
                    value={weather.destinationRelativeHumidity || ''}
                    onChange={(e) => setWeather({ ...weather, destinationRelativeHumidity: e.target.value })}
                    className="info-input"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Origin Visibility</label>
                  <input
                    type="text"
                    value={weather.originVisibility || ''}
                    onChange={(e) => setWeather({ ...weather, originVisibility: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Visibility</label>
                  <input
                    type="text"
                    value={weather.destinationVisibility || ''}
                    onChange={(e) => setWeather({ ...weather, destinationVisibility: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Origin Wind Speed</label>
                  <input
                    type="text"
                    value={weather.originWindSpeed || ''}
                    onChange={(e) => setWeather({ ...weather, originWindSpeed: e.target.value })}
                    className="info-input"
                  />
                </div>
                <div className="input-group">
                  <label>Destination Wind Speed</label>
                  <input
                    type="text"
                    value={weather.destinationWindSpeed || ''}
                    onChange={(e) => setWeather({ ...weather, destinationWindSpeed: e.target.value })}
                    className="info-input"
                  />
                </div>
              </div>
              <button className="close-popup-button" onClick={() => setShowMoreWeather(false)}>Close</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-container">
            <div className="image-placeholder">
              <img src={image3} alt="Image 3" className="circle-image" />
            </div>
            <div className="results-container">
              <div className="info-box results-box">
                <h3 className="info-title">Model Results</h3>
                <p>{modelResult}</p>
              </div>
              <div className="info-box results-box">
                <h3 className="info-title">SHAP Values</h3>
                <p>{shapValues}</p>
              </div>
            </div>
            <div className="button-container">
              <button onClick={handleBackStep} className="back-button">Edit Information</button>
              <button onClick={handleNextStep} className="next-button">Get Insights</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-container">
            <div className="image-placeholder">
              <img src={image4} alt="Image 4" className="circle-image" />
            </div>
            <div className="results-container">
              <div className="info-box results-box">
                <h3 className="info-title">Actionable Insights</h3>
                <p>{insights}</p>
              </div>
            </div>
            <div className="button-container">
              <button onClick={handleBackStep} className="back-button">Model Results</button>
            </div>
          </div>
        )}

        <div className="step-indicator">
          <div className={`circle ${step === 1 ? 'active' : ''}`}></div>
          <div className={`circle ${step === 2 ? 'active' : ''}`}></div>
          <div className={`circle ${step === 3 ? 'active' : ''}`}></div>
          <div className={`circle ${step === 4 ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
