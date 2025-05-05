import Plot from 'react-plotly.js';

const SHAPPlot = ({ shapValues, featureNames }) => {
    console.log({shapValues})
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: shapValues,
          y: featureNames,
          orientation: 'h',
          marker: { color: shapValues.map(v => v > 0 ? 'green' : 'red') },
        },
      ]}
      layout={{ title: 'SHAP Feature Contributions', width: 600, height: 400 }}
    />
  );
};


export default SHAPPlot;