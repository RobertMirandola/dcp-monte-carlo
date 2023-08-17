export async function deployPiJob(ev, chart)
{
  ev.preventDefault();
  const numberInput = parseInt(document.getElementById('numberInput').value);

  const inputSet = circleInputSet(numberInput);

  const { compute } = window.dcp;

  let JSONKeystore = `{"version":3,"id":"2368b025-07a7-4ae7-bb6c-dd5d1140feec","address":"fd7559234c213f703e1d2535c68d5e208025fa38","crypto":{"ciphertext":"cceccaf7c9453a85b7d56f7ea464a6479da0dd10841ce1cbe382eafd389ff035","cipherparams":{"iv":"c2d6378f2259f681d652b33368f06053"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"8a463a40099b7059e8912d323b2d8c412782a349fd8bc624d908eead6ad73ce7","n":1024,"r":8,"p":1},"mac":"a067d65add5839d9e6ea1ceaef63672f87a50f81fe20246558879f081e0ff120"},"label":"monte-carlo","timestamp":"Wed Aug 16 2023 13:44:40 GMT-0400 (GMT-04:00)","process":"http://localhost:6889/"}`
  const keystore = await new window.dcp.wallet.Keystore(JSONKeystore);

  const job = compute.for(inputSet, circleWorkFunction);
  job.on('readystatechange', (ev) => {
    document.getElementById('jobStatus').textContent = `Job state: ${ev}`;
  });

  job.setPaymentAccountKeystore(keystore);

  let pointsInCircle = 0;
  let totalPoints = 0;
  let resultCount = 0;
  job.on('result', async (ev) => {
    let resultSent = ev.result;
    if (!(resultSent instanceof Array))
      resultSent = window.dcp.kvin.deserialize(resultSent);

    pointsInCircle += resultSent.filter((point) => { return point.pointInCircle === true }).length;
    totalPoints += resultSent.length;
    updateCircleChart(numberInput, chart, resultSent, pointsInCircle, totalPoints);
    resultCount++;
    document.getElementById('slicesCompleted').textContent = `Number of slices completed: ${resultCount}`;
  })

  await job.exec();
}


function circleWorkFunction(numPoints)
{
  progress();
  var coordinates = [];
  for (let i = 0; i < numPoints; i++)
  {
    var pointInCircle = false;
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const valToCompare = x*x + y*y;

    /* Check if point is in the unit circle */
    if (valToCompare <= 1)
      pointInCircle = true;

    coordinates.push({ x: x, y: y, pointInCircle });
  }
  return coordinates;
}

function circleInputSet(iterationNum)
{
  let inputSet = [];
  for (let i = 0; i < iterationNum; i++)
    inputSet.push(1000); // Do like 60 slices

  return inputSet;
}

async function updateCircleChart(label, chart, data, pointsInCircle, totalPoints)
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

    console.log('pointsInCircle', pointsInCircle)
    console.log('totalPoints', totalPoints)
    const piEstimate = (pointsInCircle / totalPoints) * 4;
    document.getElementById('circleEstimate').innerHTML = `<b>Current π Estimation = ${piEstimate.toFixed(4)}</b>`;
    chart.update();
}