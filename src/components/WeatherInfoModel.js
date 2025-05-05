import React from 'react';
import Modal from './Modal';

const weatherInfo = [
    {columnName:'origin_HourlyAltimeterSetting', label:'Origin Altimeter Setting'},
    {columnName:'dest_HourlyAltimeterSetting', label:'Destination Altimeter Setting'},
    {columnName:'origin_HourlyDewPointTemperature', label:'Origin Dew Point Temperature'},
    {columnName:'dest_HourlyDewPointTemperature', label:'Destination Dew Point Temperature'},
    {columnName:'origin_HourlyStationPressure', label:'Origin Station Pressure'},
    {columnName:'dest_HourlyStationPressure', label:'Destination Station Pressure'},
    {columnName:'origin_HourlyWetBulbTemperature', label:'Origin Wet Bulb Temperature'},
    {columnName:'dest_HourlyWetBulbTemperature', label:'Destination Wet Bulb Temperature'},
    {columnName:'origin_HourlyDryBulbTemperature', label:'Origin Dry Bulb Temperature'},
    {columnName:'dest_HourlyDryBulbTemperature', label:'Destination Dry Bulb Temperature'},
    {columnName:'origin_HourlyRelativeHumidity', label:'Origin Relative Humidity'},
    {columnName:'dest_HourlyRelativeHumidity', label:'Destination Relative Humidity'},
    {columnName:'origin_HourlyVisibility', label:'Origin Visibility'},
    {columnName:'dest_HourlyVisibility', label:'Destination Visibility'},
    {columnName:'origin_HourlyWindSpeed', label:'Origin Wind Speed'},
    {columnName:'dest_HourlyWindSpeed', label:'Destination Wind Speed'},
]

function WeatherInfoModel({flightData, setFlightData, setShowWeatherModal}) {
    return (
        <Modal title="Weather Information" onClose={() => setShowWeatherModal(false)}>
            <div className='grid grid-cols-4 gap-3 flex items-end'>

            
            {weatherInfo.map(info => (
                <div className="input-group">
                    <label className=''>{info.label}</label>
                    <input
                        type="text"
                        value={flightData[info.columnName]}
                        onChange={(e) => setFlightData({ ...flightData, [info.columnName]: e.target.value })}
                        className="info-input"
                    />
                </div>
                
            ))}
            </div>
        </Modal>
    )
}

export default WeatherInfoModel;
