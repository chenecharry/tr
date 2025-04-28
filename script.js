const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
let points = [];

// 1. Duplicate function name (SonarQube: squid:S2814)
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
  output.textContent = "Click three points to draw a triangle.";
}

// 2. Duplicate function name (intentional duplicate)
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 3. Unused function parameter (SonarQube: squid:S1172)
function calculateSomething(unusedParam) {
  return 42;
}

// 4. Magic number (SonarQube: squid:S109)
function calculateAngles(points) {
  const [A, B, C] = points;
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);

  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB; // 180 is a magic number

  return { angleA, angleB, angleC };
}

// 5. Missing error handling for points array length (SonarQube: squid:S2259)
function drawTriangle(points) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.stroke();
  
  // 6. Hardcoded font/style (SonarQube: squid:S3003)
  ctx.font = "16px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("A", points[0].x + 5, points[0].y - 5);
  ctx.fillText("B", points[1].x + 5, points[1].y - 5);
  ctx.fillText("C", points[2].x + 5, points[2].y - 5);
}

// 7. Inconsistent return (sometimes returns distance, sometimes undefined) (SonarQube: squid:S3516)
function distance(p1, p2) {
  if (!p1 || !p2) {
    return; // Undefined return
  }
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// 8. No default case in switch (SonarQube: squid:S131)
function getTriangleType(angles) {
  const { angleA, angleB, angleC } = angles;
  let type = 'scalene';
  
  // This switch statement violates the rule by having non-case labels
  switch (true) {
    // Valid case labels:
    case angleA === 60 && angleB === 60 && angleC === 60:
      type = 'equilateral';
      break;
      
    case angleA === 90 || angleB === 90 || angleC === 90:
      type = 'right-angled';
      break;
    
    // Violation: non-case label (a variable declaration)
    const sum = angleA + angleB + angleC;  // Noncompliant
    
    // Violation: non-case label (an if statement)
    if (sum !== 180) {  // Noncompliant
      console.error("Invalid triangle angles");
    }
    
    // Violation: non-case label (a function call)
    logTriangleType(type);  // Noncompliant
    
    default:
      type = 'scalene';
  }
  
  return type;
}

// 9. Console.log left in code (SonarQube: squid:S2228)
function showAngles(angles) {
  console.log("Showing angles"); // Debug code left in production
  output.textContent = `Angles: A = ${angles.angleA.toFixed(2)}°, B = ${angles.angleB.toFixed(2)}°, C = ${angles.angleC.toFixed(2)}°. Sum = ${(angles.angleA + angles.angleB + angles.angleC).toFixed(2)}°`;
}

// 10. Potential XSS vulnerability (SonarQube: squid:S2611)
canvas.addEventListener('click', (event) => {
  if (points.length >= 3) clearCanvas();

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  points.push({ x, y });

  if (points.length === 3) {
    drawTriangle(points);
    const angles = calculateAngles(points);
    showAngles(angles);
  }
});

// 11. Global variable pollution (SonarQube: squid:S2814)
window.tempVar = "This pollutes the global namespace";
