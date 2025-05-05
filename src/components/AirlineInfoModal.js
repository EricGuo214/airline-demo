import React, { useState } from 'react';
import Modal from './Modal';



function parseTime(time) {
    // time format is 2023-05-24 23:22:00+00:00 parse it to 23:22
    return time.split(' ')[1].split('+')[0]
}

function parseWeekday(weekday) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekdays[weekday]
}

const airlineInfo = [
    {columnName:'weekday', label:'Weekday', isTime: false},
    {columnName:'actual_departure_utc', label:'Departure Time', isTime: true},
    {columnName:'scheduled_arrival_utc', label:'Arrival Time', isTime: true},
    {columnName:'turn_time', label:'Turnaround Time', isTime: false},
]

function AirlineInfoModal({setShowAirlineModal, flightData, setFlightData}) {
    // const [time, setTime] = useState('10:00');
    // const [weekday, setWeekdat] = useState(flightData.weekday)
    // const [departureTime, setDepartureTime] = useState(parseTime(flightData.actual_departure_utc))
    // const [arrivalTime, setArrivalTime] = useState(parseTime(flightData.scheduled_arrival_utc))
    // const [turnaroundTime, setTurnaroundTime] = useState(flightData.turn_time)

    return (
        <Modal title="Airline Information" onClose={() => setShowAirlineModal(false)}>
            {airlineInfo.map(info => (
                <div className="input-group">
                    <label>{info.label}</label>
                    <input
                        type="text"
                        value={info.columnName === 'weekday' ? parseWeekday(flightData[info.columnName]) : info.isTime ? parseTime(flightData[info.columnName]) : flightData[info.columnName]}
                        onChange={(e) => setFlightData({ ...flightData, [info.columnName]: e.target.value })}
                        // onChange={(e) => info.columnName === 'weekday' ? setWeekday(e.target.value) : info.columnName === 'actual_departure_utc' ? setDepartureTime(e.target.value) : info.columnName === 'scheduled_arrival_utc' ? setArrivalTime(e.target.value) : setTurnaroundTime(e.target.value)}
                        className="info-input"
                    />
                </div>
            ))}
        </Modal>
    )
}

// function AirlineInfoModal({setShowAirlineModal, flightData, setWeekday, setDepartureTime, setArrivalTime, setTurnaroundTime}) {
//     // const [time, setTime] = useState('10:00');
//     // const [weekday, setWeekdat] = useState(flightData.weekday)
//     // const [departureTime, setDepartureTime] = useState(parseTime(flightData.actual_departure_utc))
//     // const [arrivalTime, setArrivalTime] = useState(parseTime(flightData.scheduled_arrival_utc))
//     // const [turnaroundTime, setTurnaroundTime] = useState(flightData.turn_time)
   

    
    
   
//     return (
//         <Modal title="Airline Information" onClose={() => setShowAirlineModal(false)}>
            
//             <div className="input-row-2">
//               <div className="input-group">
//                 <label>Weekday</label>
//                 <input
//                   type="text"
//                   value={parseWeekday(flightData.weekday)}
//                   onChange={(e) => setWeekday(e.target.value)}
//                   className="info-input"
//                 />
//               </div>
//               <div className="input-group">
//                 <label>Departure Time</label>
//                 <input
//                   type="text"
//                   value={parseTime(flightData.actual_departure_utc)}
//                   onChange={(e) => setDepartureTime(e.target.value)}
//                   className="info-input"
//                 />
//               </div>
//             </div>
//             <div className="input-row-2">
//               <div className="input-group">
//                 <label>Arrival Time</label>
//                 <input
//                   type="text"
//                   value={parseTime(flightData.scheduled_arrival_utc)}
//                   onChange={(e) => setArrivalTime(e.target.value)}
//                   className="info-input"
//                 />
//               </div>
//               <div className="input-group">
//                 <label>Turnaround Time</label>
//                 <input
//                   type="text"
//                   value={flightData.turn_time}
//                   onChange={(e) => setTurnaroundTime(e.target.value)}
//                   className="info-input"
//                 />
//               </div>
//             </div>
//             {/* <div className="input-row-2">
//               <div className="input-group">
//                 <label>Elapsed Time</label>
//                 <input
//                   type="text"
//                   value={elapsedTime}
//                   onChange={(e) => setElapsedTime(e.target.value)}
//                   className="info-input"
//                 />
//               </div>
//             </div> */}
//           </Modal>

//     )
// }

export default AirlineInfoModal