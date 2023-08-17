#! /usr/bin/env node

async function main()
{
  const compute = require('dcp/compute');
  const fs = require('fs');
  
  const file = 'euler.json';

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

  function workFunction(numPoints)
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

  const inputSet = [50, 500, 5000, 50000, 100000];

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
