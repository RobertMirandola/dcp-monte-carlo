export function createChart(unitCircleData, squareData) 
{
  const ctx = document.getElementById("myCanvas").getContext("2d");
  const chart = new Chart(ctx, {
      type: "scatter",
      data: {
          datasets: [{
              label: "Unit Circle",
              data: unitCircleData,
              borderColor: 'blue',
              pointRadius: 0.2
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
                  min: -1.2,
                  max: 1.2
              },
              y: {
                  min: -1.2,
                  max: 1.2
              }
          },
          plugins: {
              legend: { display: false }
          }
      }
  });

  return chart;
}

export function updateChart(chart, label, data)
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
  chart.update();
}