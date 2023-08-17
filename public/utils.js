export function renderCircleMath()
{
  document.getElementById("eulerMathContainer").textContent = '';
  document.getElementById('jobStatus').textContent = '';
  document.getElementById('slicesCompleted').textContent = '';
  document.getElementById("eulerEstimate").textContent = '';


  var mathTitle = document.getElementById("mathTitle");
  mathTitle.innerHTML = `<b><u>Mathematical Explanation</b></u>`;

  var latexCode = "\\(\\frac{\\mathrm{Area\\ of\\ Circle}}{\\mathrm{Area\\ of\\ Square}} = \\frac{4 \\pi r^2}{4r^2} = \\frac{\\pi}{4}\\)<br>"
  + "\\(\\frac{\\pi}{4} = \\frac{\\mathrm{Points\\ Inside\\ Circle}}{\\mathrm{Points\\ Inside\\ Square}}\\)<br>"
  + "\\(\\therefore \\quad \\pi = 4(\\frac{\\mathrm{Points\\ Inside\\ Circle}}{\\mathrm{Points\\ Inside\\ Square}}\\))";

  var mathElement = document.getElementById("circleMathContainer");
  mathElement.innerHTML = latexCode;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathElement]);
}

export function renderEulerMath()
{
  document.getElementById("circleMathContainer").textContent = '';
  document.getElementById('jobStatus').textContent = '';
  document.getElementById('slicesCompleted').textContent = '';
  document.getElementById("circleEstimate").textContent = '';

  var mathTitle = document.getElementById("mathTitle");
  mathTitle.innerHTML = `<b><u>Mathematical Explanation</b></u>`;

  var latexCode = "\\(\\text{Area} = \\int_{0}^{1} e^x \\, dx\\) <br>"
  + "\\(= e^x + c \\bigg|_{0}^{1}\\) <br>"
  + "\\(= e^1 - e^0\\) <br>"
  + "\\(= e - 1\\) <br>"
  + "\\(\\therefore \\, e = \\text{Area} + 1\\)";

  var mathElement = document.getElementById("eulerMathContainer");
  mathElement.innerHTML = latexCode;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathElement]);
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
