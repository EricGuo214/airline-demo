import image3 from '../image3.jpg';
import shapImage from '../SHAP.png';


function Step3({ handleNextStep, handleBackStep, prediction }) {
    let predictionText = ''
    let delayAmount = ''
    if (prediction) {
        predictionText = 'Not Delayed'
        delayAmount = 'Less'
    } else {
        predictionText = 'Delayed'
        delayAmount = 'More'
    }
    return (
        <div className="step-container page-3 relative z-10">
        <div className="image-placeholder">
          <img src={image3} alt="Image 3" className="rounded-full w-36 h-36 object-cover mx-auto mb-5" />
        </div>
        <div className="results-container">
          <div className="info-box results-box full-width">
            <h3 className="info-title">Model Prediction</h3>
            <p>{predictionText}</p>
          </div>
          <div className="info-box results-box full-width">
            <h3 className="info-title">Delay Type</h3>
            <p>{delayAmount} than 15 minutes</p>
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
    )
}

export default Step3;