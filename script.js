var width = Math.round((document.documentElement.clientWidth - 20) / 1.1)
    height = Math.round(width / 1.777)
    pointSize = 10
    div = document.getElementById("svg_window")
    divW = div.style.width
    divH = div.style.height
    svg = SVG("svg_window").size(width, height)
    x = y = 0
    numberPoints = 0
    numberLines = 2
    currentPoint = {}
    circleColor = "#000"
    lineColor = "#000"
    lineColor1 = circleColor
    lineColor2 = circleColor;

divW = width + "px";
divH = height + "px";
document.getElementById("valueWigth").innerHTML = width;
document.getElementById("valueHeight").innerHTML = height;

// НАЗНАЧЕНИЕ СОБЫТИЙ
document.getElementById("btnClear").onclick = clear;
document.getElementById("changeColor").onclick = changeColor;
document.getElementById("btnPicker").onclick = colorPicker;
document.getElementById("svg_window").onclick = drawing;
document.getElementById("pointSize").oninput = sizePoint;
document.getElementById("widthSVG").oninput = changeSize;
document.getElementById("heightSVG").oninput = changeSize;

// ИЗМЕНЕНИЕ РАЗМЕРА SVG
function changeSize() {
  if (this.name == "height") {
    document.getElementById("valueHeight").innerHTML = this.value;
    height = this.value;
  } else if (this.name == "width"){
    document.getElementById("valueWigth").innerHTML = this.value;
    width = this.value;
  }
  svg = SVG("svg_window").size(width, height);
  clear();
};

// ИЗМЕНЕНИЕ РАЗМЕРА ТОЧКИ
function sizePoint() {
  pointSize = this.value;
  document.getElementById("pointSizeValue").innerHTML = this.value;
};

// ГЛАВНАЯ ФУНКЦИЯ - РИСОВАНИЕ ЭЛЕМЕНТОВ
function drawing(e) {
  numberPoints += 1;
  numberLines = document.getElementById("numberLines").value;
  var x = e.offsetX==undefined?e.layerX:e.offsetX;
  var y = e.offsetY==undefined?e.layerY:e.offsetY;
  currentPoint.xfar = currentPoint.xp;
  currentPoint.yfar = currentPoint.yp;
  currentPoint.xp = currentPoint.xl;
  currentPoint.yp = currentPoint.yl;
  currentPoint.xl = currentPoint.x;
  currentPoint.yl = currentPoint.y;
  currentPoint.x = x;
  currentPoint.y = y;

  svg.circle(pointSize).fill(circleColor).move(currentPoint.x - (pointSize / 2), currentPoint.y - (pointSize / 2));

  if (numberPoints == 1 || numberLines == 0) {
    return
  } else if (numberPoints == 2 || numberLines == 1) {
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xl, currentPoint.yl).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
  }else if (numberLines == 3 & numberPoints > 3) {
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xl, currentPoint.yl).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xp, currentPoint.yp).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xfar, currentPoint.yfar).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
  } else {
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xl, currentPoint.yl).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
    svg.line(currentPoint.x, currentPoint.y, currentPoint.xp, currentPoint.yp).animate({ ease: '>'}).stroke({ color: lineColor, width: 1 });
  };
}

// COLOR-PICKER
function colorPicker() {
  circleColor = document.getElementById("colorPickerPoints").value;
  lineColor = document.getElementById("colorPickerLines").value;
  if (circleColor == ""){
    circleColor = document.getElementById("circleColor").value;
  };

  if (lineColor == ""){
    lineColor = document.getElementById("lineColor").value;
  };
};

// ВЫБОР ЦВЕТА
function changeColor() {
  lineColor = document.getElementById("lineColor").value;
  circleColor = document.getElementById("circleColor").value;
};

// УДАЛЕНИЕ НАРИСОВАННОГО
function clear() {
  // УДАЛЯЕТ SVG И СОЗДАЁТ ЗАНОВО
  document.getElementById("svg_window").innerHTML = "";
  svg = SVG("svg_window").size(width, height);
  numberPoints = 0;
  currentPoint = {};
};
