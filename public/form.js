import { updateChart } from './chart.js';
import { renderFormula } from './utils.js';

export function setupForm(modelResults, chart) {
  let currentIndex = 1;
  const form = document.getElementById("addDataSetForm");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
      if (currentIndex < modelResults.length) {
      const numIterations = modelResults[currentIndex].length;
      const data = modelResults[currentIndex];
      updateChart(chart, numIterations, data);
      document.getElementById('numIterations').textContent = `${numIterations} iterations`;
      }
      currentIndex++;
      if (currentIndex === modelResults.length) {
          const button = document.getElementById("submitButton");
          button.style.opacity = 0.5;
          button.style.pointerEvents = "none";
      }
      renderFormula(String.raw`$$x^2 + y^2 \leq r^2$$`);
  });
}