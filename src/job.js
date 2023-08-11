#! /usr/bin/env node

async function main()
{
  const compute = require('dcp/compute');
  const fs = require('fs');

  function workFunction(numPoints)
  {
    progress();
    var pointInCircle = false;
    var coordinates = [];
    for (let i = 0; i < numPoints; i++)
    {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      coordinates.push({x: x, y: y });
      const valToCompare = x*x + y*y;

      /* Check if point is in the quarter circle */
      if (valToCompare < 0.5)
        pointInCircle = true;
    }
    return coordinates;
  }

  const max = 10;
  const min = 1;
  let inputSet = []; // Number of points
  for (let i = 1; i < 5; i++)
    inputSet.push(100*i);

  const job = compute.for(inputSet, workFunction);

  job.on('readystatechange', (ev) => {
    console.log(ev);
  })

  job.on('result', (ev) => {
    console.log(ev)
  })

  const results = await job.exec();
  const resultsJSON = JSON.stringify(results.values());


  const filePath = 'out.json';
  fs.writeFile(filePath, resultsJSON, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
  } else {
      console.log('JSON data written to file:', filePath);
  }
  })

}


require('dcp-client').init().then(main);
