import image2 from '../image2.png';
import airlineImage from '../airline.jpg';
import weatherImage from '../weather.png';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';


function Step2({airline, flightNumber, weather, setWeather, flightData, setFlightData ,setShowAirlineModal, setShowWeatherModal, handleNextStep, handleBackStep}) {


    return (
      <>
      {(flightData) && (
        <div className="step-container page-2 relative z-10">
          <div className="image-placeholder">
            <img src={image2} alt="Image 2" className="rounded-full w-36 h-36 object-cover mx-auto" />
          </div>
          <div className="info-map-container">
            <div className="info-container">
              <div className="info-box">
                <div className="info-header">
                  <h3 className="info-title">Airline Information</h3>
                  <img src={airlineImage} alt="Airline" className="-ml-48 -mt-3 w-50 h-50" />
                  <button
                    type="button"
                    className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => setShowAirlineModal(true)}
                  >
                    See More
                  </button>
                </div>
                <div className="input-row h-12">
                  <div className="input-group">
                    <label>Airline</label>
                    <input
                      type="text"
                      value={airline?.name}
                      onChange={(e) => setFlightData({ ...flightData, 'airline': e.target.value })}
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
                      onChange={(e) => setFlightData({ ...flightData, 'flight_number': e.target.value })}
                      className="info-input"
                      readOnly
                      disabled
                    />
                  </div>
  
                  <div className="input-group">
                    <label>Origin</label>
                    <input
                      type="text"
                      value={flightData.origin}
                      onChange={(e) => setFlightData({ ...flightData, 'origin': e.target.value })}
                      className="info-input"
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="input-group">
                    <label>Destination</label>
                    <input
                      value={flightData.destination}
                      onChange={(e) => setFlightData({ ...flightData, 'destination': e.target.value })}
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
                  <img src={weatherImage} alt="Weather" className="-ml-48 -mt-3 w-50 h-50" />
                  <button
                    type="button"
                    className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={() => setShowWeatherModal(true)}
                  >
                    See More
                  </button>
                </div>
                <div className="input-row h-12">
                  <div className="input-group">
                    <label>Origin Wind Speed</label>
                    <input
                      type="text"
                      value={flightData.origin_HourlyWindSpeed}
                      onChange={(e) => setFlightData({ ...flightData, 'origin_HourlyWindSpeed': e.target.value })}
                      className="info-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Destination Wind Speed</label>
                    <input
                      type="text"
                      value={flightData.dest_HourlyWindSpeed}
                      onChange={(e) => setFlightData({ ...flightData, 'dest_HourlyWindSpeed': e.target.value })}
                      className="info-input"
                    />
                  </div>
                  <div className="input-group">
                    <label>Origin Visibility</label>
                    <input
                      type="text"
                      value={flightData.origin_HourlyVisibility}
                      onChange={(e) => setFlightData({ ...flightData, 'origin_HourlyVisibility': e.target.value })}
                      className="info-input"
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <div className="w-1/3 -mt-8 ml-8 px-5 pt-2 mb-2 bg-white border rounded-lg shadow">
              {/* <MapContainer center={[39.8283, -98.5795]} zoom={3} className="leaflet-container">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={route} color="red" />
              </MapContainer> */}
                <div className="info-header">
                  <h3 className='font-medium'>Network Information</h3>
                  {/* <img src={weatherImage} alt="Weather" className="-ml-8  w-8 h-8" /> */}
                  
                </div>
                <div className='mt-8'>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='inline-block align-middle text-left'>
                      Actual Crowdedness Last 12H
                    </label>
                    <input
                      type="text"
                      value={flightData.Q_12H}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                    
                  </div>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='text-left'>
                      Actual Crowdedness Last 1H
                    </label>
                    <input
                      type="text"
                      value={flightData.Q_1H}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                  </div>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='text-left'>
                      Scheduled Crowdedness
                    </label>
                    <input
                      type="text"
                      value={flightData['Q^s']}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                  </div>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='text-left'>
                      Demand-Capacity Imbalance
                    </label>
                    <input
                      type="text"
                      value={flightData.ρ}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                  </div>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='text-left'>
                      Network Crowdedness Last 12 H
                    </label>
                    <input
                      type="text"
                      value={flightData.N_12H}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                  </div>
                  <div className='mb-1 grid grid-cols-2'>
                    <label className='text-left'>
                      Network Crowdedness Last 1 H
                    </label>
                    <input
                      type="text"
                      value={flightData.N_1H}
                      onChange={(e) => setWeather({ ...weather, temperature: e.target.value })}
                      className="info-input text-center"
                    />
                  </div>
                </div>      
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
              Model Results
            </button>
          </div>
        </div>
      )}
      </>
    )
  
  }
export default Step2;  