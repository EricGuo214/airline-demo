import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import oracleLogo from './ologo.png';
import image1 from './image1.jpg';
import image2 from './image2.png';
import image3 from './image3.jpg';
import image4 from './image4.png';
import shapImage from './SHAP.png';
import airlineImage from './airline.jpg'; 
import weatherImage from './weather.png'; 

function Modal({ title, children, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        {children}
        <button onClick={onClose} className="close-popup-button">Close</button>
      </div>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [weather, setWeather] = useState({
    originAltimeterSetting: '',
    destinationAltimeterSetting: '',
    originDewPointTemperature: '',
    destinationDewPointTemperature: '',
    originStationPressure: '',
    destinationStationPressure: '',
    originWetBulbTemperature: '',
    destinationWetBulbTemperature: '',
    originDryBulbTemperature: '',
    destinationDryBulbTemperature: '',
    originRelativeHumidity: '',
    destinationRelativeHumidity: '',
    originVisibility: '',
    destinationVisibility: '',
    originWindSpeed: '',
    destinationWindSpeed: ''
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
  const [showAirlineModal, setShowAirlineModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const steps = [
    { id: 'Step 1', name: 'Airline Information', href: '#', status: step > 1 ? 'complete' : 'current' },
    { id: 'Step 2', name: 'Weather Information', href: '#', status: step > 2 ? 'complete' : step === 2 ? 'current' : 'upcoming' },
    { id: 'Step 3', name: 'Model Results', href: '#', status: step > 3 ? 'complete' : step === 3 ? 'current' : 'upcoming' },
    { id: 'Step 4', name: 'Actionable Insights', href: '#', status: step === 4 ? 'current' : 'upcoming' }
  ];

  const flightNumbers = {
    'DL - Delta Airlines': ['DL1234', 'DL5678', 'DL9101'],
    'AA - American Airlines': ['AA2345', 'AA6789', 'AA1011'],
    'UA - United Airlines': ['UA3456', 'UA7890', 'UA1121'],
    'SW - Southwest Airlines': ['SW4567', 'SW8901', 'SW1213'],
    'AS - Alaska Airlines': ['AS5678', 'AS9012', 'AS1314']
  };

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
    if (showWeatherModal) {
      const weatherData = {
        originAltimeterSetting: '29.92 inHg',
        destinationAltimeterSetting: '30.01 inHg',
        originDewPointTemperature: '60°F',
        destinationDewPointTemperature: '62°F',
        originStationPressure: '1013 mb',
        destinationStationPressure: '1015 mb',
        originWetBulbTemperature: '61°F',
        destinationWetBulbTemperature: '63°F',
        originDryBulbTemperature: '70°F',
        destinationDryBulbTemperature: '72°F',
        originRelativeHumidity: '75%',
        destinationRelativeHumidity: '70%',
        originVisibility: '10 miles',
        destinationVisibility: '8 miles',
        originWindSpeed: '15 mph',
        destinationWindSpeed: '12 mph'
      };
      setWeather(weatherData);
    }
  }, [showWeatherModal]);

  const handleAirlineChange = (e) => {
    setAirline(e.target.value);
    setFlightNumber(''); 
  };

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
              <select
                value={airline}
                onChange={handleAirlineChange}
                className="input-field"
              >
                <option value="">Select Airline</option>
                <option value="DL - Delta Airlines">DL - Delta Airlines</option>
                <option value="AA - American Airlines">AA - American Airlines</option>
                <option value="UA - United Airlines">UA - United Airlines</option>
                <option value="SW - Southwest Airlines">SW - Southwest Airlines</option>
                <option value="AS - Alaska Airlines">AS - Alaska Airlines</option>
              </select>
              <select
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="input-field"
              >
                <option value="">Select Flight Number</option>
                {airline &&
                  flightNumbers[airline]?.map((flight, index) => (
                    <option key={index} value={flight}>
                      {flight}
                    </option>
                  ))}
              </select>
              <button onClick={handleNextStep} className="get-flight-info-button">Get Flight Info</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-container page-2">
            <div className="image-placeholder">
              <img src={image2} alt="Image 2" className="circle-image" />
            </div>
            <div className="info-map-container">
              <div className="info-container">
                <div className="info-box">
                  <div className="info-header">
                    <h3 className="info-title">Airline Information</h3>
                    <img src={airlineImage} alt="Airline" className="header-image" />
                    <button className="see-more-button" onClick={() => setShowAirlineModal(true)}>
                      See More
                    </button>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label>Airline</label>
                      <input
                        type="text"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        className="info-input"
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="input-group">
                      <label>Flight Number</label>
                      <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="info-input"
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="input-group">
                      <label>Origin</label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="info-input"
                        readOnly
                        disabled
                      />
  
                    </div>
                    <div className="input-group">
                      <label>Destination</label>
                      <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="info-input"
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="info-box weather-info-container">
                  <div className="info-header">
                    <h3>Weather Information</h3>
                    <img src={weatherImage} alt="Weather" className="header-image" />
                    <button className="see-more-button" onClick={() => setShowWeatherModal(true)}>
                      See More
                    </button>
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
                <MapContainer center={[39.8283, -98.5795]} zoom={3} className="leaflet-container">
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

        {step === 3 && (
          <div className="step-container page-3">
            <div className="image-placeholder">
              <img src={image3} alt="Image 3" className="circle-image" />
            </div>
            <div className="results-container">
              <div className="info-box results-box full-width">
                <h3 className="info-title">Model Prediction</h3>
                <p>Not Delayed</p>
              </div>
              <div className="info-box results-box full-width">
                <h3 className="info-title">Delay Type</h3>
                <p>Less than 15 minutes</p>
              </div>
            </div>
            <div className="shap-container">
              <div className="shap-box">
                <h3 className="info-title">SHAP Values</h3>
                <img src={shapImage} alt="SHAP Values" className="shap-image" />
              </div>
            </div>
            <div className="button-container">
              <button onClick={handleBackStep} className="back-button">Edit Information</button>
              <button onClick={handleNextStep} className="next-button">Get Insights</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-container page-4">
            <div className="image-placeholder4">
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

        
        {showAirlineModal && (
          <Modal title="Airline Information" onClose={() => setShowAirlineModal(false)}>
            <div className="input-row-2">
              <div className="input-group">
                <label>Weekday</label>
                <input
                  type="text"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Departure Time</label>
                <input
                  type="text"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="info-input"
                />
              </div>
            </div>
            <div className="input-row-2">
              <div className="input-group">
                <label>Arrival Time</label>
                <input
                  type="text"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Turnaround Time</label>
                <input
                  type="text"
                  value={turnaroundTime}
                  onChange={(e) => setTurnaroundTime(e.target.value)}
                  className="info-input"
                />
              </div>
            </div>
            <div className="input-row-2">
              <div className="input-group">
                <label>Elapsed Time</label>
                <input
                  type="text"
                  value={elapsedTime}
                  onChange={(e) => setElapsedTime(e.target.value)}
                  className="info-input"
                />
              </div>
            </div>
          </Modal>
        )}

        
        {showWeatherModal && (
          <Modal title="Weather Information" onClose={() => setShowWeatherModal(false)}>
            <div className="input-row-4">
              <div className="input-group">
                <label>Origin Altimeter Setting</label>
                <input
                  type="text"
                  value={weather.originAltimeterSetting}
                  onChange={(e) => setWeather({ ...weather, originAltimeterSetting: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Altimeter Setting</label>
                <input
                  type="text"
                  value={weather.destinationAltimeterSetting}
                  onChange={(e) => setWeather({ ...weather, destinationAltimeterSetting: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Origin Dew Point Temperature</label>
                <input
                  type="text"
                  value={weather.originDewPointTemperature}
                  onChange={(e) => setWeather({ ...weather, originDewPointTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Dew Point Temperature</label>
                <input
                  type="text"
                  value={weather.destinationDewPointTemperature}
                  onChange={(e) => setWeather({ ...weather, destinationDewPointTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
            </div>
            <div className="input-row-4">
              <div className="input-group">
                <label>Origin Station Pressure</label>
                <input
                  type="text"
                  value={weather.originStationPressure}
                  onChange={(e) => setWeather({ ...weather, originStationPressure: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Station Pressure</label>
                <input
                  type="text"
                  value={weather.destinationStationPressure}
                  onChange={(e) => setWeather({ ...weather, destinationStationPressure: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Origin Wet Bulb Temperature</label>
                <input
                  type="text"
                  value={weather.originWetBulbTemperature}
                  onChange={(e) => setWeather({ ...weather, originWetBulbTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Wet Bulb Temperature</label>
                <input
                  type="text"
                  value={weather.destinationWetBulbTemperature}
                  onChange={(e) => setWeather({ ...weather, destinationWetBulbTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
            </div>
            <div className="input-row-4">
              <div className="input-group">
                <label>Origin Dry Bulb Temperature</label>
                <input
                  type="text"
                  value={weather.originDryBulbTemperature}
                  onChange={(e) => setWeather({ ...weather, originDryBulbTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Dry Bulb Temperature</label>
                <input
                  type="text"
                  value={weather.destinationDryBulbTemperature}
                  onChange={(e) => setWeather({ ...weather, destinationDryBulbTemperature: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Origin Relative Humidity</label>
                <input
                  type="text"
                  value={weather.originRelativeHumidity}
                  onChange={(e) => setWeather({ ...weather, originRelativeHumidity: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Relative Humidity</label>
                <input
                  type="text"
                  value={weather.destinationRelativeHumidity}
                  onChange={(e) => setWeather({ ...weather, destinationRelativeHumidity: e.target.value })}
                  className="info-input"
                />
              </div>
            </div>
            <div className="input-row-4">
              <div className="input-group">
                <label>Origin Visibility</label>
                <input
                  type="text"
                  value={weather.originVisibility}
                  onChange={(e) => setWeather({ ...weather, originVisibility: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Visibility</label>
                <input
                  type="text"
                  value={weather.destinationVisibility}
                  onChange={(e) => setWeather({ ...weather, destinationVisibility: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Origin Wind Speed</label>
                <input
                  type="text"
                  value={weather.originWindSpeed}
                  onChange={(e) => setWeather({ ...weather, originWindSpeed: e.target.value })}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Destination Wind Speed</label>
                <input
                  type="text"
                  value={weather.destinationWindSpeed}
                  onChange={(e) => setWeather({ ...weather, destinationWindSpeed: e.target.value })}
                  className="info-input"
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="progress-container">
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step) => (
              <li key={step.name} className="md:flex-1">
                {step.status === 'complete' ? (
                  <a
                    href={step.href}
                    className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  >
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </a>
                ) : step.status === 'current' ? (
                  <a
                    href={step.href}
                    aria-current="step"
                    className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  >
                    <span className="text-sm font-medium text-indigo-600">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </a>
                ) : (
                  <a
                    href={step.href}
                    className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  >
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default MultiStepForm;
