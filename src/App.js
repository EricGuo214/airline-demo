import React, { useState, useEffect } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import 'leaflet/dist/leaflet.css';
import './App.css';
import oracleLogo from './ologo.png';

import { set, useForm } from 'react-hook-form';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import AirlineInfoModal from './components/AirlineInfoModal';
import WeatherInfoModel from './components/WeatherInfoModel';


import { getFlightInfo, predictFlightDelay, getAirlinesWithFlights } from './services/api.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


const airlines = [
  { id: 'DL', name: 'Delta Airlines' },
  { id: 'AA', name: 'American Airlines' },
  { id: 'UA', name: 'United Airlines' },
  { id: 'SW', name: 'Southwest Airlines' },
  { id: 'AS', name: 'Alaska Airlines' },
  { id: 'B6', name: 'JetBlue Airways' },
  { id: 'WN', name: 'Southwest Airlines' },
  { id: 'F9', name: 'Frontier Airlines' },
  { id: 'NK', name: 'Spirit Airlines' },
  { id: 'G4', name: 'Allegiant Air' },
  { id: 'HA', name: 'Hawaiian Airlines' },
  { id: 'VX', name: 'Virgin America' },
  { id: 'SY', name: 'Sun Country Airlines'}
];


function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [airline, setAirline] = useState(null);
  const [flightNumber, setFlightNumber] = useState(null);
  const [weather, setWeather] = useState({
    temperature: '',
    humidity: '',
    // windSpeed: '',
    // originAltimeterSetting: '',
    // destinationAltimeterSetting: '',
    // originDewPointTemperature: '',
    // destinationDewPointTemperature: '',
    // originStationPressure: '',
    // destinationStationPressure: '',
    // originWetBulbTemperature: '',
    // destinationWetBulbTemperature: '',
    // originDryBulbTemperature: '',
    // destinationDryBulbTemperature: '',
    // originRelativeHumidity: '',
    // destinationRelativeHumidity: '',
    // originVisibility: '',
    // destinationVisibility: '',
    // originWindSpeed: '',
    // destinationWindSpeed: '',
  });
  const [airlinesWithFlights, setAirlinesWithFlights] = useState([]);
  const [flightNumbers, setFlightNumbers] = useState({});
  const [loading, setLoading] = useState(false);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weekday, setWeekday] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
  const [modelResult, setModelResult] = useState('');
  // const [shapValues, setShapValues] = useState('');
  const [insights, setInsights] = useState('');
  const [showAirlineModal, setShowAirlineModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [airlineQuery, setAirlineQuery] = useState('');
  const [flightQuery, setFlightQuery] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [featureNames, setFeatureNames] = useState(null);
  const [shapValues, setShapValues] = useState(null);


  const [filteredAirlines, setFilteredAirlines] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const fetchAirlines = async () => {
      const data = await getAirlinesWithFlights();
      console.log('what')
      console.log({data})
      console.log('whiiiiis')
      setFlightNumbers(data.data.airlines);
    };
    fetchAirlines();
  }, []);


  useEffect(() => {
    const filteredAirlines =
    airlineQuery === ''
      ? airlines
      : airlines.filter((airline) => airline.name.toLowerCase().includes(airlineQuery.toLowerCase()));
    setFilteredAirlines(filteredAirlines);

  const filteredFlights =
    flightQuery === ''
      ? (airline ? flightNumbers[airline.id] : [])
      : (airline ? flightNumbers[airline.id].filter((flight) => flight.toLowerCase().includes(flightQuery.toLowerCase())) : []);
    setFilteredFlights(filteredFlights);
    
  }, [airlineQuery, flightQuery, flightNumbers, airline]);

  useEffect(() => {
    setFlightNumber(null);
    
  }, [airline]);

  // console.log('rendering')
  // console.log({flightData})

  // let flightData = null;
  let isLoading = false;
  let isError = false;
  
  const steps = [
    { name: 'Step 1', status: step > 1 ? 'complete' : 'current' },
    { name: 'Step 2', status: step > 2 ? 'complete' : step === 2 ? 'current' : 'upcoming' },
    { name: 'Step 3', status: step > 3 ? 'complete' : step === 3 ? 'current' : 'upcoming' },
    // { name: 'Step 4', status: step === 4 ? 'current' : 'upcoming' }
  ];


  

  const handleNextStep = async () => {
    console.log("llega")
    if (step === 1) {
      // const data = {
      //   airline: airlines[0],
      //   flightNumber: 'DL1234',
      // };
      
      const flightInfo = await getFlightInfo(airline.id, flightNumber);
      console.log('flightInfo', flightInfo)
      setFlightData(flightInfo.data.flight_info[0]);
      console.log('whwhw')
      // setAirline(data.airline);
      // setFlightNumber(data.flightNumber);
    }

    else if (step === 2) {
      console.log('whatfwfwfwwwfewtrgb')
      const pred = await predictFlightDelay(flightData);
      console.log('pred', pred)
      setPrediction(pred.data.prediction);
      setShapValues(pred.data.shapvalues)
      setFeatureNames(pred.data.featurenames)
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
      // const data = {
      //   airline: airlines[0],
      //   flightNumber: 'DL1234',
      // };
      
      // setAirline(data.airline);
      // setFlightNumber(data.flightNumber);
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
      // setAirline(data.airline);
      // setFlightNumber(data.flightNumber);
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
      // setShapValues(data.shapValues);
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
          <Step2 setFlightData={setFlightData} flightData={flightData} setStep={setStep} airline={airline} flightNumber={flightNumber} weather={weather} setWeather={setWeather} handleNextStep={handleNextStep} handleBackStep={handleBackStep} setShowAirlineModal={setShowAirlineModal} setShowWeatherModal={setShowWeatherModal} />
          
        )}

        {step === 3 && (
          <Step3 prediction={prediction} shapValues={shapValues} featureNames={featureNames} handleNextStep={handleNextStep} handleBackStep={handleBackStep} />
          
        )}

        {step === 4 && (
          <Step4 handleBackStep={handleBackStep} insights={insights} />
        )}

        {showAirlineModal && (
          <AirlineInfoModal setShowAirlineModal={setShowAirlineModal} airline={airline} flightData={flightData} setWeekday={setWeekday} setDepartureTime={setDepartureTime} setArrivalTime={setArrivalTime} setTurnaroundTime={setTurnaroundTime} />
        )}

        {showWeatherModal && (
          <WeatherInfoModel setShowWeatherModal={setShowWeatherModal} flightData={flightData} setFlightData={setFlightData} />
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