#! /usr/bin/env node

async function main()
{
  const compute = require('dcp/compute');
  const fs = require('fs');

  const file = 'out.json';

    // Check if the file exists
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist.');
    } else {
        // Delete the file
        fs.unlink(file, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting file:', unlinkErr);
            } else {
                console.log('File deleted successfully.');
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

      /* Check if point is in the quarter circle */
      if (valToCompare < 1)
        pointInCircle = true;

      coordinates.push({x: x, y: y, pointInCircle });
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

  const results = await job.exec();
  const resultsJSON = JSON.stringify(results.values());


  fs.writeFile(file, resultsJSON, (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
  } else {
      console.log('JSON data written to file:', file);
  }
  })

}


require('dcp-client').init().then(main);
