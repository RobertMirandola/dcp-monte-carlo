export async function deployEulerJob(ev, chart)
{
  ev.preventDefault();
  const numberInput = parseInt(document.getElementById('numberInput').value);

  const inputSet = eulerInputSet(numberInput);

  const { compute } = window.dcp;

  let JSONKeystore = `{"version":3,"id":"2368b025-07a7-4ae7-bb6c-dd5d1140feec","address":"fd7559234c213f703e1d2535c68d5e208025fa38","crypto":{"ciphertext":"cceccaf7c9453a85b7d56f7ea464a6479da0dd10841ce1cbe382eafd389ff035","cipherparams":{"iv":"c2d6378f2259f681d652b33368f06053"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"8a463a40099b7059e8912d323b2d8c412782a349fd8bc624d908eead6ad73ce7","n":1024,"r":8,"p":1},"mac":"a067d65add5839d9e6ea1ceaef63672f87a50f81fe20246558879f081e0ff120"},"label":"monte-carlo","timestamp":"Wed Aug 16 2023 13:44:40 GMT-0400 (GMT-04:00)","process":"http://localhost:6889/"}`
  const keystore = await new window.dcp.wallet.Keystore(JSONKeystore);

  const job = compute.for(inputSet, eulerWorkFunction);
  job.on('readystatechange', (ev) => {
    document.getElementById('jobStatus').textContent = `Job state: ${ev}`;
  });

  job.setPaymentAccountKeystore(keystore);

  let pointsUnderCurve = 0;
  let totalPoints = 0;
  let resultCount = 0;
  job.on('result', async (ev) => {
    let resultSent = ev.result;
    if (!(resultSent instanceof Array))
      resultSent = window.dcp.kvin.deserialize(resultSent);

    pointsUnderCurve += resultSent.filter((point) => { return point.pointUnderCurve === true }).length;
    totalPoints += resultSent.length;
    updateEulerChart(numberInput, chart, resultSent, pointsUnderCurve, totalPoints);
    resultCount++;
    document.getElementById('slicesCompleted').textContent = `Number of slices completed: ${resultCount}`;
  })

  await job.exec();
}


function eulerWorkFunction(numPoints)
{
  progress();

  const maxRange = 1;
  progress();
  const data = [];

  for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * maxRange;
    const y = Math.random() * Math.exp(maxRange);

    // Check if the point is under the curve
    const pointUnderCurve = y <= Math.exp(x);

    data.push({ x, y, pointUnderCurve, maxRange });
  }
  return data;
}

function eulerInputSet(iterationNum)
{
  let inputSet = [];
  for (let i = 0; i < iterationNum; i++)
    inputSet.push(500); // Do like 60 slices

  return inputSet;
}

async function updateEulerChart(label, chart, data, pointsUnderCurve, totalPoints)
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
    const eulerEstimate = ((pointsUnderCurve / totalPoints) * (maxRange * Math.exp(1)) + 1);
    document.getElementById('eulerEstimate').innerHTML = `<b>Current euler number estimate: ${eulerEstimate.toFixed(4)}</b>`;
    chart.update();
}