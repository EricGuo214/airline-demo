import React, { useState, useEffect } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import 'leaflet/dist/leaflet.css';
import './App.css';
import oracleLogo from './ologo.png';
import image3 from './image3.jpg';
import image4 from './image4.png';
import shapImage from './SHAP.png';

import { set, useForm } from 'react-hook-form';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import AirlineInfoModal from './components/AirlineInfoModal';


import { getFlightInfo } from './services/api.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


function Modal({ title, children, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        {children}
        <button
          type="button"
          className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}


const airlines = [
  { id: 'DL', name: 'Delta Airlines' },
  { id: 'AA', name: 'American Airlines' },
  { id: 'UA', name: 'United Airlines' },
  { id: 'SW', name: 'Southwest Airlines' },
  { id: 'AS', name: 'Alaska Airlines' },
];

const flightNumbers = {
  'DL': ['DL1234', 'DL5678', 'DL9101'],
  'AA': ['AA2345', 'AA6789', 'AA1011'],
  'UA': ['UA3456', 'UA7890', 'UA1121'],
  'SW': ['SW4567', 'SW8901', 'SW1213'],
  'AS': ['AS5678', 'AS9012', 'AS1314']
};


function MultiStepForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [airline, setAirline] = useState(null);
  const [flightNumber, setFlightNumber] = useState(null);
  const [weather, setWeather] = useState({
    temperature: '',
    humidity: '',
    windSpeed: '',
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
    destinationWindSpeed: '',
  });
  const [loading, setLoading] = useState(false);

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
  const [airlineQuery, setAirlineQuery] = useState('');
  const [flightQuery, setFlightQuery] = useState('');
  const [flightData, setFlightData] = useState(null);

  // console.log('rendering')
  // console.log({flightData})

  // let flightData = null;
  let isLoading = false;
  let isError = false;
  
  const steps = [
    { name: 'Step 1', status: step > 1 ? 'complete' : 'current' },
    { name: 'Step 2', status: step > 2 ? 'complete' : step === 2 ? 'current' : 'upcoming' },
    { name: 'Step 3', status: step > 3 ? 'complete' : step === 3 ? 'current' : 'upcoming' },
    { name: 'Step 4', status: step === 4 ? 'current' : 'upcoming' }
  ];

  const filteredAirlines =
    airlineQuery === ''
      ? airlines
      : airlines.filter((airline) => airline.name.toLowerCase().includes(airlineQuery.toLowerCase()));

  const filteredFlights =
    flightQuery === ''
      ? (airline ? flightNumbers[airline.id] : [])
      : (airline ? flightNumbers[airline.id].filter((flight) => flight.toLowerCase().includes(flightQuery.toLowerCase())) : []);

  const handleNextStep = async () => {
    console.log("llega")
    if (step === 1) {
      const data = {
        airline: airlines[0],
        flightNumber: 'DL1234',
      };
      
      const flightInfo = await getFlightInfo(data.airline.id, data.flightNumber);
      console.log('flightInfo', flightInfo)
      setFlightData(flightInfo);
      console.log('whwhw')
      setAirline(data.airline);
      setFlightNumber(data.flightNumber);
    }
    console.log(flightData);
    console.log({step});
    
    setStep((prevStep) => prevStep + 1);
    
  };


  const handleBackStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  console.log('flightData')
  console.log(flightData);
  console.log('AAAAA')

  useEffect(() => {
    if (step === 1) {
      const data = {
        airline: airlines[0],
        flightNumber: 'DL1234',
      };
      
      setAirline(data.airline);
      setFlightNumber(data.flightNumber);
    }

    if (step === 2) {
      console.log('in step 2 use', flightData)
      const data = {
        airline: airlines[0],
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

  console.log({flightNumber})

  

  return (
    <div className="App">
      <header className="header-bar">
        <img src={oracleLogo} alt="Oracle Logo" className="oracle-logo" />
      </header>
      <div className="App-content">
        {step === 1 && (
          <Step1 setAirline={setAirline} setFlightNumber={setFlightNumber} airline={airline} flightNumber={flightNumber} setAirlineQuery={setAirlineQuery} setFlightQuery={setFlightQuery} filteredAirlines={filteredAirlines} filteredFlights={filteredFlights} handleNextStep={handleNextStep} />
        )}

        {step === 2 && (
          <Step2 step={step} flightData={flightData} setStep={setStep} airline={airline} setAirline={setAirline} flightNumber={flightNumber} setFlightNumber={setFlightNumber} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} weather={weather} setWeather={setWeather} handleNextStep={handleNextStep} handleBackStep={handleBackStep} setAirlineQuery={setAirlineQuery} setFlightQuery={setFlightQuery} filteredAirlines={filteredAirlines} filteredFlights={filteredFlights} showAirlineModal={showAirlineModal} setShowAirlineModal={setShowAirlineModal} showWeatherModal={showWeatherModal} setShowWeatherModal={setShowWeatherModal} />
          
        )}

        {step === 3 && (
          <div className="step-container page-3 relative z-10">
            <div className="image-placeholder">
              <img src={image3} alt="Image 3" className="rounded-full w-36 h-36 object-cover mx-auto mb-5" />
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
            <div className="button-container absolute bottom-0 left-5 right-5 pt-10">
              <button
                type="button"
                className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-3"
                onClick={handleBackStep}
              >
                Back
              </button>
              <button
                type="button"
                className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-3"
                onClick={handleNextStep}
              >
                Get Insights
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-container page-4 relative z-10">
            <div className="image-placeholder">
              <img src={image4} alt="Image 4" className="rounded-full w-36 h-36 object-cover mx-auto mb-5" />
            </div>
            <div className="results-container4">
              <div className="info-box results-box">
                <h3 className="info-title">Actionable Insights</h3>
                <p>{insights}</p>
              </div>
            </div>
            <div className="button-container absolute bottom-0 left-5 right-5 pt-10">
              <button
                type="button"
                className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-3"
                onClick={handleBackStep}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {showAirlineModal && (
          <AirlineInfoModal setShowWeatherModal={setShowWeatherModal} airline={airline} flightData={flightData} setWeekday={setWeekday} setDepartureTime={setDepartureTime} setArrivalTime={setArrivalTime} setTurnaroundTime={setTurnaroundTime} />
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

      <div className="progress-container flex justify-center absolute bottom-0 left-0 w-full p-2 z-100">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                {step.status === 'complete' ? (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="h-0.5 w-full bg-red-600" />
                      </div>
                    )}
                    <a
                      href="#"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-600 hover:bg-red-900"
                    >
                      <CheckIcon aria-hidden="true" className="h-5 w-5 text-white" />
                      <span className="sr-only">{step.name}</span>
                    </a>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="h-0.5 w-full bg-gray-200" />
                      </div>
                    )}
                    <a
                      href="#"
                      aria-current="step"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-600 bg-white"
                    >
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-red-600" />
                      <span className="sr-only">{step.name}</span>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 && (
                      <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="h-0.5 w-full bg-gray-200" />
                      </div>
                    )}
                    <a
                      href="#"
                      className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      />
                      <span className="sr-only">{step.name}</span>
                    </a>
                  </>
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