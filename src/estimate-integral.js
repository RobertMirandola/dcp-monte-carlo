#! /usr/bin/env node

async function main()
{
  const compute = require('dcp/compute');
  const fs = require('fs');
  
  const file = 'integral.json';

  // Check if the file exists
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist.');
    } else {
        // Delete the file
        fs.unlink(file, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting file:', unlinkErr);
            }
        });
    }
});

  function workFunction(maxNumPoints)
  {
    progress();
    // Simulate a point (x, y) uniformly in [0, 1] x [0, f(max)]
    function simulatePoint() 
    {
      const x = Math.random();
      const y = Math.random() * x ** 2; // y is sampled from [0, f(x)]
      return { x, y };
    }
    const data = [];
    for (let numPoints = 10; numPoints <= maxNumPoints; numPoints += 10) {
      let sum = 0;
  
      for (let i = 0; i < numPoints; i++) {
        const { x, y } = simulatePoint();
        sum += y;
      }
  
      const integral = sum / numPoints;
      data.push({ x: numPoints, y: integral });
    }
    return data;
  }

  const inputSet = [50, 500, 5000, 50000];

  const job = compute.for(inputSet, workFunction);

  job.on('readystatechange', (ev) => {
    console.log(ev);
  })

  const results = await job.exec();
  const resultsJSON = JSON.stringify(results.values());


  fs.writeFile(file, resultsJSON, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
  } else {
      console.log('JSON data written to file:', file);
  }
  });
}

require('dcp-client').init().then(main);
