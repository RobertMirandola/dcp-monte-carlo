export function renderFormula(formulaString)
{
  const formula = document.getElementById("formula");
  formula.innerHTML = formulaString;
  MathJax.typeset();
}

export function createSimpleShapeData()
{
  const unitCircleData = [];
  for (let angle = 0; angle <= Math.PI*2; angle += 0.01) 
  {
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      unitCircleData.push({ x, y });
  }
  const squareData = [{ x: -1, y: -1 },    
    { x: -1, y: 1 },    
    { x: 1, y: 1 }, 
    { x: 1, y: -1 }, 
    { x: -1, y: -1} ];

  return { unitCircleData, squareData };
}