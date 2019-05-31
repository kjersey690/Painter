  /*jshint esversion: 6 */

window.PixelPainter = function(height, width){

  let main = document.getElementById("pixelPainter");
  let canvasDiv = document.createElement("div");
  canvasDiv.id = 'pp-canvas';


  main.appendChild(canvasDiv);

  let clickHappenYet = false;

  let selectedColor = 'green';

  let colorToFill;

  let toolPicked;

  function canvasGrid(gridHeight, gridWidth, classStr, parent){
   for(i = 1; i <= gridHeight; i++){
      for(j = 1; j <= gridWidth; j++){
        var newCell = document.createElement('div');
        newCell.id = 'cell' + i+'-' +j;
        newCell.className = classStr;
        newCell.style.backgroundColor = 'white';
        newCell.addEventListener('mousedown', fillColorOnClick);
        newCell.addEventListener('mouseenter', fillColorOnHover);
        newCell.addEventListener('mouseup', fillColorOnMouseUp);
        parent.appendChild(newCell);
      }
      var lineBreak = document.createElement('br');
      parent.appendChild(lineBreak);
    }
  }

  canvasGrid(height, width, 'canvasCells', canvasDiv);

  function fillColorOnClick (e){
    clickHappenYet = true;

    switch (toolPicked){
      case 'fill':
        colorToFill = e.target.style.backgroundColor;
        var allCanvasCells = document.getElementsByClassName('canvasCells');
        for (let i = 0; i < allCanvasCells.length; i++){
          if(allCanvasCells[i].style.backgroundColor === colorToFill){
            allCanvasCells[i].style.backgroundColor = selectedColor;
          }
        }
        break;

        default:
        clickHappenYet = true;
        e.target.style.backgroundColor = selectedColor;
        break;
    }

  }

  function fillColorOnHover (e){
    if(clickHappenYet === true){
      switch (toolPicked){
        // case 'eraser':
        //   e.target.style.backgroundColor = 'white';
        //   break;
        case 'brush':
          e.target.style.backgroundColor = selectedColor;
          break;
        default:
          e.target.style.backgroundColor = selectedColor;
          break;
        }
    }
  }

  function fillColorOnMouseUp (e){
    clickHappenYet = false;
  }

  const toolBox = document.createElement("div");

  const clear = document.createElement("div");
  clear.addEventListener("click", clearFunc);
  clear.id = 'clearBtn';
  toolBox.appendChild(clear);

  clear.textContent = 'Clear';
  
   
      
  const colorPalette = document.createElement("div");
  toolBox.appendChild(colorPalette);

  pixelPainter.appendChild(toolBox);
  toolBox.id = "toolBox";
  colorPalette.id = "colorPalette";

  function paletteGrid(height, width, classStr, parent){
   for(i = 1; i <= height; i++){
      for(j = 1; j <= width; j++){
        var newCell = document.createElement('div');
        newCell.id = 'color' + i + j;
        newCell.className = classStr;
        newCell.addEventListener('click', pickColor);
        parent.appendChild(newCell);
      }
      var lineBreak = document.createElement('br');
      parent.appendChild(lineBreak);
    }
  }

  paletteGrid (5,2, 'paletteCells', colorPalette);

  var chosenColors = ['aqua', 'teal', 'blue', 'navy', 'fuchsia', 'indigo', 'purple', 'violet', 'green', 'lime'];

  var colorPaletteEls = document.getElementsByClassName('paletteCells');

  for (var k = 0; k < colorPaletteEls.length; k++){
    colorPaletteEls[k].style.backgroundColor = chosenColors[k];
  }

  function pickColor (e) {
    selectedColor = e.target.style.backgroundColor;

    var allColors = document.getElementsByClassName('paletteCells');
    for (var i = 0; i < allColors.length; i++){
      allColors[i].className = 'paletteCells';
    }

    e.target.className += ' ' +'activeColor';
  }

  function clearFunc (e) {
    var allCanvasCells = document.getElementsByClassName('canvasCells');
    for (var i = 0; i < allCanvasCells.length; i++){
      allCanvasCells[i].style.backgroundColor = 'white';
    }
  }

  const eraserButton = document.createElement('div');
  eraserButton.id = 'eraser';
  eraserButton.className = 'toolBoxButton';
  eraserButton.textContent = 'Eraser';
  eraserButton.addEventListener('click', eraserFunc);
  toolBox.appendChild(eraserButton);

 
  function selectTool(e){
    switch (e.target.id){
      case 'eraser':
      toolPicked = 'eraser';
        break;
       case 'brush':
       e.target.style.backgroundColor = selectedColor;
        break;
        
        
    }

    var allToolButtons = document.getElementsByClassName('toolBoxButton');
    for (var i = 0; i < allToolButtons.length; i++){
      allToolButtons[i].className = 'toolBoxButton';
    }

    e.target.className += ' ' +'clickedButton';
  }

  
  function eraserFunc (e) {
    if(e.target.id === 'eraser'){
      selectedColor = "white";
    }
  }



   
};

PixelPainter(18,18);
