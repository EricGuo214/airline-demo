import image2 from '../image2.png';
import airlineImage from '../airline.jpg';
import weatherImage from '../weather.png';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const route = [
    [40.6413, -73.7781],
    [33.9416, -118.4085]
  ];

function Step2({step, airline, setAirline, flightNumber, setFlightNumber, origin, setOrigin, destination, setDestination, weather, setWeather, flightData, setAirlineQuery, setFlightQuery, filteredAirlines, filteredFlights, showAirlineModal, setShowAirlineModal, showWeatherModal, setShowWeatherModal, setStep}) {
    console.log('inside')
    console.log(flightData.data);
    console.log({airline});
    console.log({flightNumber});
    console.log('inside')
  
    const handleNextStep = () => {
      setStep(3);
    }
  
    const handleBackStep = () => {
      setStep(1);
    }
    return (
      <>
      {(flightData && flightData.data) && (
        <div className="step-container page-2 relative z-10">
          <div className="image-placeholder">
            <img src={image2} alt="Image 2" className="rounded-full w-36 h-36 object-cover mx-auto" />
          </div>
          <div className="info-map-container">
            <div className="info-container">
              <div className="info-box">
                <div className="info-header">
                  <h3 className="info-title">Airline Information</h3>
                  <img src={airlineImage} alt="Airline" className="header-image" />
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