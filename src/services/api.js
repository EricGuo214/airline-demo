// src/services/api.js

export const predictFlightDelay = async (flightData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data; // Returns the prediction and probability
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
  };
  
  export const getAccuracyData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/accuracy');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data; // Returns the accuracy data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  };
  