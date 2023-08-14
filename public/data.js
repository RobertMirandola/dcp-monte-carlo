export async function fetchData(filePath)
{
  const res = await fetch(filePath);
  const resJSON = await res.json();
  const modelResults = [];
  for (let i = 0; i < resJSON.length; i++ )
  {
    if (!(resJSON[i] instanceof Array))
      modelResults[i] = window.dcp.kvin.deserialize(resJSON[i]);
    else
      modelResults[i] = resJSON[i];
  }
  return modelResults;
}