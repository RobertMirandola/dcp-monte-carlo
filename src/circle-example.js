#! /usr/bin/env node

async function main()
{
  const compute = require('dcp/compute');
  const fs = require('fs');
  
  const file = 'circle-example.json';

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
    var coordinates = [];
    for (let i = 0; i < numPoints; i++)
    {
      var pointInCircle = false;
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const valToCompare = x*x + y*y;

      /* Check if point is in the unit circle */
      if (valToCompare < 1)
        pointInCircle = true;

      coordinates.push({ x: x, y: y, pointInCircle });
    }
    return coordinates;
  }

  const inputSet = [50, 500, 5000];

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
