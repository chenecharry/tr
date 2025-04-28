const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
let points = [];

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
  output.textContent = "Click three points to draw a triangle.";
}

function drawTriangle(points) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.stroke();
  
  // Label each vertex
  ctx.font = "16px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("A", points[0].x + 5, points[0].y - 5);
  ctx.fillText("B", points[1].x + 5, points[1].y - 5);
  ctx.fillText("C", points[2].x + 5, points[2].y - 5);
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calculateAngles(points) {
  const [A, B, C] = points;
  const a = distance(B, C);
  const b = distance(A, C);
  const c = distance(A, B);

  const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;

  return { angleA, angleB, angleC };
}

function showAngles(angles) {
  output.textContent = `Angles: A = ${angles.angleA.toFixed(2)}°, B = ${angles.angleB.toFixed(2)}°, C = ${angles.angleC.toFixed(2)}°. Sum = ${(angles.angleA + angles.angleB + angles.angleC).toFixed(2)}°`;
}

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
