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

function AirlineInfoModal({setShowAirlineModal, flightData, setWeekday, setDepartureTime, setArrivalTime, setTurnaroundTime}) {
    console.log('inside airline info modal')
    console.log(flightData)
    console.log(flightData.data)
    console.log(flightData.data.flight_info.weekday)
    const flightInfo = flightData.data.flight_info[0]
    console.log(flightInfo)
    console.log(flightInfo[0])
    return (
        <Modal title="Airline Information" onClose={() => setShowAirlineModal(false)}>
            <div className="input-row-2">
              <div className="input-group">
                <label>Weekday</label>
                <input
                  type="text"
                  value={flightInfo.weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Departure Time</label>
                <input
                  type="text"
                  value={flightInfo.actual_departure_utc}
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
                  value={flightInfo.scheduled_arrival_utc}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="info-input"
                />
              </div>
              <div className="input-group">
                <label>Turnaround Time</label>
                <input
                  type="text"
                  value={flightInfo.turn_time}
                  onChange={(e) => setTurnaroundTime(e.target.value)}
                  className="info-input"
                />
              </div>
            </div>
            {/* <div className="input-row-2">
              <div className="input-group">
                <label>Elapsed Time</label>
                <input
                  type="text"
                  value={elapsedTime}
                  onChange={(e) => setElapsedTime(e.target.value)}
                  className="info-input"
                />
              </div>
            </div> */}
          </Modal>

    )
}

export default AirlineInfoModal