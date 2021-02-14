let canvas = document.querySelector('#precanvas');
let ctx = canvas.getContext('2d');

let input = document.querySelector('input');
for (let e of document.querySelectorAll('.input')) {
  e.addEventListener('input', init);
}


function init() {

  let speed = input.value;
  let rank_colors = [
    {main: '#8d8d8d', bg: '#dddddd'}, // Новичок
    {main: '#4f9a97', bg: '#cbe1e0'}, // Любитель
    {main: '#187818', bg: '#bad7ba'}, // Таксист
    {main: '#8c8100', bg: '#ddd9b3'}, // Профи
    {main: '#ba5800', bg: '#eacdb3'}, // Гонщик
    {main: '#bc0143', bg: '#ebb3c7'}, // Маньяк
    {main: '#5e0b9e', bg: '#cfb6e2'}, // Супермен
    {main: '#2e32ce', bg: '#c1c2f0'}, // Кибергонщик
    {main: '#061956', bg: '#b5bacd'}, // Экстракибер
    {main: '#000000', bg: '#b3b3b3'} // Тахион
]
  let rank = 0;
  if (speed.length > 2)
    rank = parseInt(speed.slice(0, speed.length - 2));
  if (rank >= rank_colors.length)
    rank = rank_colors.length - 1;

  let textCheck = document.querySelector('#textCheck');
  let backgroundCheck = document.querySelector('#backgroundCheck');
  let circleCheck = document.querySelector('#circleCheck');
  
  let colors = [
    textCheck.checked ? textCheck.previousElementSibling.value : rank_colors[rank].main,
    backgroundCheck.checked ? backgroundCheck.previousElementSibling.value : rank_colors[rank].bg,
    circleCheck.checked ? circleCheck.previousElementSibling.value : rank_colors[rank].main
  ]; // text, bg, circle
  
  textCheck.previousElementSibling.value = colors[0];
  if (colors[1].length === 9)
    backgroundCheck.previousElementSibling.value = colors[1].slice(0, 7);
  else
    backgroundCheck.previousElementSibling.value = colors[1];
  circleCheck.previousElementSibling.value = colors[2];

  let circleProgress = speed % 100;
  main(colors, circleProgress);

}


function main(colors, circleProgress) {

  clearCanvas();
  drawBackground();
  drawCircle();
  drawText();
  resizeAndShow();


  function resizeAndShow() {
    if (document.querySelector('#finalCanvas'))
      document.querySelector('#finalCanvas').remove();
    let resizedCanvas = getResizedCanvas(canvas, 100, 100);
    resizedCanvas.id = 'finalCanvas';
    document.body.append(resizedCanvas);
  }


  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  function drawBackground() {
    let background = new Path2D();
    background.arc(100, 100, 96, 0, 2 * Math.PI);
    ctx.fillStyle = colors[1];
    ctx.fill(background);
  }


  function drawCircle() {
    let circle = new Path2D();
    circle.arc(100, 100, 96, -90 / (180 / Math.PI), deg(circleProgress));
    ctx.strokeStyle = colors[2];
    ctx.lineWidth = 8;
    if (circleProgress !== 0)
      ctx.lineCap = 'round';
    else
      ctx.lineCap = 'butt';
    ctx.stroke(circle);

    function deg(val) {
      if (circleProgress > 90)
        return (((val + circleProgress / 100) * 3.6 - 90) / (180 / Math.PI));
      else
        return ((val * 3.6 - 90) / (180 / Math.PI));
    }
  }


  function drawText() {
    ctx.font = '70px Rubik, sans-serif';
    ctx.fillStyle = colors[0];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(input.value, 100, 104);
  }


  function getResizedCanvas(canvas, newWidth, newHeight) {
    let tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    let ctx = tmpCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

    return tmpCanvas;
  }

}
