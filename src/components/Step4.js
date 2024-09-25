import image4 from '../image4.png';


function Step4({ handleBackStep, insights }) {
    return (
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
    )
}

export default Step4;