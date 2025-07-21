function easMouseOver(event) {
  // Separate between "normal" and "random" modes first, then
  // determine the actions to perform on the cell.

  // change the color of the cell from white or random rgb colors
  // to black
  if (currentMode == "normal") {
    if (!event.target.classList.contains("black")) {
      event.target.classList.add("black");
    }
    if (event.target.classList.contains("random")) {
      event.target.classList.remove("random");
    }
    event.target.style.backgroundColor = "";
  }

  // change the color of the cell from white or black to
  // random rgb color
  if (currentMode == "random") {
    if (event.target.classList.contains("black")) {
      event.target.classList.remove("black");
    }
    if (!event.target.classList.contains("random")) {
      event.target.classList.add("random");
    }
    event.target.style.backgroundColor = randomRGBAVal();
  }

  // This condition removes colors from the cell and class name,
  // effectively clears the cell
  if (event.shiftKey) {
    console.log(
      "[" +
        easMouseOver.name +
        "] shift key detected, event: " +
        event.target.classList,
    );
    if (event.target.classList.contains("black")) {
      event.target.classList.remove("black");
    }
    if (event.target.classList.contains("random")) {
      event.target.classList.remove("random");
      event.target.style.backgroundColor = "";
    }
  }
}

function randomRGBAVal() {
  let redVal = Math.floor(Math.random() * 256);
  let greenVal = Math.floor(Math.random() * 256);
  let blueVal = Math.floor(Math.random() * 256);
  var rgbaVal = "rgba(" + redVal + "," + greenVal + "," + blueVal + ",1.0)";

  return rgbaVal;
}

function easMouseClick(event) {
  // to detect mouse 'right' click, use:
  //   document.addEventListener("contextmenu", callbackFunction);
  if (event.target.classList.contains("col")) {
    console.log("[easMouseClick] You've click inside the drawing area");
  }
  // User can change the mode when left clicking outside the drawing area
  if (!event.target.classList.contains("col")) {
    console.log("[easMouseClick] You've click outside the drawing area");
    if (currentMode == "normal") {
      currentMode = "random";
    } else {
      currentMode = "normal";
    }
    modeInfo = document.querySelector("#modeTxt");
    modeInfo.textContent = modeInfoPreTxt + currentMode;
  }

  return;
}

function clickResizeArea(event) {
  const userInput = prompt("Enter the new area size: ", 16);
  if (userInput > 100) {
    userInput = 100;
  }
  if (userInput < 0) {
    userInput = 16;
  }

  var tmpRow = document.querySelector(".main");
  removeCells(tmpRow);
  createDiv(userInput);
}

// Function to calculate the cell size. The cells will be square.
// The value of the witdth and height should be calculated against
// how many cells are to be generated for a 960px area. The number of
// cells is obtained from the user.
function calculateCellSize(numOfCells) {
  let cellWidth = Math.floor(960 / numOfCells);
  console.log(
    "[calculateCellSize] numOfCells: " +
      numOfCells +
      ", cellWidth: " +
      cellWidth,
  );
  return cellWidth;
}

function removeCells(nodeForProcessing) {
  // source: https://www.geeksforgeeks.org/javascript/remove-all-the-child-elements-of-a-dom-node-in-javascript/
  let child = nodeForProcessing.lastElementChild;
  while (child) {
    nodeForProcessing.removeChild(child);
    child = nodeForProcessing.lastElementChild;
  }
}

function createDiv(sketchArea) {
  let mainDiv = document.querySelector(".main.content");

  cellSize = calculateCellSize(sketchArea).toString();
  // Strategy:
  //  Create 16 rows of div containers that contain 16 cells
  //  of divs align in a row
  for (let i = 0; i < sketchArea; i++) {
    // here is where we create the divs
    var tmpRowDiv = document.createElement("div");
    tmpRowDiv.classList.add("row_" + i);
    tmpRowDiv.classList.add("row");
    tmpRowDiv.style.height = `${cellSize}px`;
    mainDiv.appendChild(tmpRowDiv);
    for (let j = 0; j < sketchArea; j++) {
      var tmpColDiv = document.createElement("div");
      let tmpString = "row_" + i + "_col_" + j;
      tmpColDiv.classList.add(tmpString);
      tmpColDiv.classList.add("col");
      tmpColDiv.style.width = `${cellSize}px`;
      tmpColDiv.setAttribute("id", tmpString);
      tmpRowDiv.appendChild(tmpColDiv);
      tmpRowDiv.addEventListener("mouseover", easMouseOver);
    }
  }
  cellSizeInfo = document.querySelector("#cellSizeTxt");
  cellSizeInfo.textContent = cellSizeInfoPreTxt + sketchArea * sketchArea;

  modeInfo = document.querySelector("#modeTxt");
  modeInfo.textContent = modeInfoPreTxt + currentMode;
}

const modeInfoPreTxt = "Mode: ";
const cellSizeInfoPreTxt = "Number of Cells: ";
var currentMode = "normal";
var drawingSize = 16; // change to allow for sketch resize
const resizeBtn = document.querySelector("button");
resizeBtn.addEventListener("click", clickResizeArea);
document.addEventListener("click", easMouseClick);

createDiv(drawingSize);
