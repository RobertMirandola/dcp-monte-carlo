#! /usr/bin/env node
async function main()
{
  const compute = require('dcp/compute');
  function workFunction(numPoints)
  {
    progress();
    var pointsInCircle = 0;
    for (let i = 0; i < numPoints; i++)
    {
      const x = Math.random();
      const y = Math.random();
      const valToCompare = x*x + y*y;

      /* Check if point is in the quarter circle */
      if (valToCompare < 0.5)
        pointsInCircle++;
    }
    return pointsInCircle;
  }

  let inputSet = []; // Number of points
  for (let i = 0; i < 2; i++)
    inputSet.push(Math.random() * (1000 - 100 ) + 100);

  const job = compute.for(inputSet, workFunction);

  job.on('readystatechange', (ev) => {
    console.log(ev);
  })

  const results = await job.exec();
  const resultsJSON = JSON.stringify(results)
  console.log(resultsJSON)

}


require('dcp-client').init().then(main);
