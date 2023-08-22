export function createUnitCircleChart(unitCircleData, squareData) 
{
  const ctx = document.getElementById("circleCanvas").getContext("2d");
  const chart = new Chart(ctx, {
    label: "Unit Circle",
    type: "scatter",
    data: {
      datasets: [{
        label: "Unit Circle",
        data: unitCircleData,
        borderColor: 'blue',
        showLine: true,
        pointRadius: 0.2,
      }, 
      {
        label: "Unit Square",
        data: squareData,
        borderColor: 'purple',
        pointRadius: 1,
        borderWidth: 1,
        showLine: true,
      }]
    },
    options: {
      aspectRatio: 1,
      scales: {
          x: {
            title: {
              display: true,
              text: 'X Values'
            },
            min: -1.2,
            max: 1.2
          },
          y: {
            title: {
              display: true,
              text: 'Y Values'
            },
            min: -1.2,
            max: 1.2
          }
      },
      plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Unit Circle'
          }
      }
    }
  });

  return chart;
}

export function updateCircleChart(chart, label, data)
{
  chart.data.datasets.push({ 
  label: `${label} iterations`,
  data: data.map(point => ({
      x: point.x,
      y: point.y,
  })),
  pointBackgroundColor: function(context) {
      const index = context.dataIndex;
      const value = data[index].pointInCircle;
      return value ? 'green' : 'red';
  },
      pointRadius: 2,
  });
  const pointsInCircle = data.filter((point) => { return point.pointInCircle === true });
  const piEstimate = (pointsInCircle.length / data.length)* 4;
  document.getElementById('estimate').textContent = `PI Estimate: ${Number(piEstimate).toFixed(2)}`;
  chart.update();
}

export function createEulerChart(rectangleData)
{
  const ctx = document.getElementById("eulerCanvas").getContext("2d");
  const chart =   new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Rectangle",
          data: rectangleData,
          borderColor: 'purple',
          pointRadius: 1,
          borderWidth: 1,
          showLine: true,
        },
        {
          label: "f(x) = e^x",
          data: Array.from({ length: 101 }, (_, i) => ({
            x: (i / 100) * 1,
            y: Math.exp((i / 100) * 1),
          })),
          borderColor: "blue",
          pointRadius: 1,
          showLine: true,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'X Values'
          },
          type: "linear",
          position: "bottom",
        },
        y: {
          title: {
            display: true,
            text: 'f(x) = eˣ'
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Natural Exponential Function'
        }
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  return chart;
}

export function updateEulerChart(chart, label, data)
{
  chart.data.datasets.push({ 
    label: `${label} iterations`,
    data: data.map(point => ({
        x: point.x,
        y: point.y,
    })),
    showLine: false,
    pointBackgroundColor: function(context) {
        const index = context.dataIndex;
        const value = data[index].pointUnderCurve;
        return value ? 'green' : 'red';
    },
        pointRadius: 2,
    });
    const maxRange = data[0].maxRange;
    const pointsUnderCurve = data.filter((point) => point.pointUnderCurve === true);
    const eulerEstimate = ((pointsUnderCurve.length / data.length) * (maxRange * Math.exp(maxRagne)) + maxRange);
    document.getElementById('estimate').textContent = `Euler estimate: ${eulerEstimate}`;
    chart.update();
}

export function clearChart(chart)
{
  const length = chart.data.datasets.length;
  if (chart.data.datasets.length > 2)
    chart.data.datasets.splice(2, length - 2);
  chart.update();
}
   