import { updateCircleChart, updateEulerChart } from './chart.js';
import { renderFormula, disableButton } from './utils.js';

export function setupForm(form, modelResults, chart) 
{
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    switch(form.id) {
      case "addCircleDataSetForm":
        addNextCircleDataSet(modelResults, chart);
        break;
      case "addEulerDataSetForm":
        addNextEulerDataSet(modelResults, chart);
      default:
    }
  });
}

function addNextCircleDataSet(modelResults, chart)
{
  const currentIndex = chart.data.datasets.length - 2;
  console.log('current index', currentIndex)
  console.log('model results length', modelResults.length)
  if (currentIndex < modelResults.length) 
  {
    const numIterations = modelResults[currentIndex].length;
    const data = modelResults[currentIndex];
    updateCircleChart(chart, numIterations, data);
    document.getElementById('numIterations').textContent = `${numIterations} iterations`;
  }

  if (currentIndex === modelResults.length - 1) 
  {
      const button = document.getElementById("circleSubmitButton");
      disableButton(button);
  }
  renderFormula(String.raw`$$x^2 + y^2 \leq r^2$$`);
}

function addNextEulerDataSet(modelResults, chart)
{
  const currentIndex = chart.data.datasets.length - 1;
  if (currentIndex < modelResults.length) 
  {
    const numIterations = modelResults[currentIndex].length;
    const data = modelResults[currentIndex];
    updateEulerChart(chart, numIterations, data);
    document.getElementById('numIterations').textContent = `${numIterations} iterations`;
  }

  if (currentIndex === modelResults.length - 1) 
  {
      const button = document.getElementById("eulerSubmitButton");
      disableButton(button);
  }
}