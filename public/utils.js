export function renderFormula(formulaString)
{
  const formula = document.getElementById("formula");
  formula.textContent = `Formula for simulation: ${formulaString}`;
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

export function disableButton(button)
{
  button.style.opacity = 0.5;
  button.style.pointerEvents = "none";
}

export function enableButton(button)
{
  button.style.opacity = 1;
  button.style.pointerEvents = 'auto';
}
