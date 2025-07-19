function easMouseOver(event) {
  // console.log("[" + easMouseOver.name + "] event: " + event.target.classList);
  // sets up an either or condition
  if (event.target.classList.contains("col")) {
    if (!event.target.classList.contains("black")) {
      event.target.classList.add("black");
    }
  }
  // make the background white
  // if (event.ctrlKey) {
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
        // event.target.classList.add("black");
      }
    }
  }
}

function clickResizeArea(event) {
  const userInput = prompt("Enter the new area size: ", 16);
  console.log("[clickResizedArea] userInput: " + userInput);

  tmpRowChildLength = document.querySelector(".row_6").children.length;
  console.log("[clickResizeArea] number of children: " + tmpRowChildLength);

  // tmpRow.forEach((cell) => {
  //   console.log("[clickResizeArea] cell: " + cell.classList);
  // });

  var tmpRow = document.querySelector(".row_3");
  removeCells(tmpRow);
  return;
}

function removeCells(nodeForProcessing) {
  // let tmpRow = document.querySelector(".row_6");

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
