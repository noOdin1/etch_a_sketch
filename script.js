function easMouseOver(event) {
  if (event.target.classList.contains("col")) {
    if (!event.target.classList.contains("black")) {
      event.target.classList.add("black");
    }
  }
  if (event.shiftKey) {
    console.log(
      "[" +
        easMouseOver.name +
        "] shift key detected, event: " +
        event.target.classList,
    );
    if (event.target.classList.contains("col")) {
      if (event.target.classList.contains("black")) {
        event.target.classList.remove("black");
      }
    }
  }
}

function clickResizeArea(event) {
  const userInput = prompt("Enter the new area size: ", 16);
  if (userInput > 100) {
    userInput = 100;
  }
  if (userInput < 0) {
    userInput = 16;
  }

  calculateCellSize(userInput);

  var tmpRow = document.querySelector(".main");
  removeCells(tmpRow);
  createDiv(userInput);
}

function setCellAttributes(size) {
  let rowElement = document.querySelector(".row");
  let colElement = document.querySelector(".col");

  rowElement.style.height(size);
  colElement.style.width(size);
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

  // Strategy:
  //  Create 16 rows of div containers that contain 16 cells
  //  of divs align in a row
  for (let i = 0; i < sketchArea; i++) {
    // here is where we create the divs
    var tmpRowDiv = document.createElement("div");
    tmpRowDiv.classList.add("row_" + i);
    tmpRowDiv.classList.add("row");
    mainDiv.appendChild(tmpRowDiv);
    for (let j = 0; j < sketchArea; j++) {
      var tmpColDiv = document.createElement("div");
      let tmpString = "row_" + i + "_col_" + j;
      tmpColDiv.classList.add(tmpString);
      tmpColDiv.classList.add("col");
      tmpColDiv.setAttribute("id", tmpString);
      tmpRowDiv.appendChild(tmpColDiv);
      tmpRowDiv.addEventListener("mouseover", easMouseOver);
    }
  }
}

var drawingSize = 16; // change to allow for sketch resize
const resizeBtn = document.querySelector("button");
resizeBtn.addEventListener("click", clickResizeArea);

createDiv(drawingSize);
