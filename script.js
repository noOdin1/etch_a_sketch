function createDiv() {
  let mainDiv = document.querySelector(".main.content");

  // Strategy:
  //  Create 16 rows of div containers that contain 16 cells
  //  of divs align in a row
  for (let i = 0; i < drawingSize; i++) {
    // here is where we create the divs
    var tmpRowDiv = document.createElement("div");
    tmpRowDiv.classList.add("row_" + i);
    tmpRowDiv.classList.add("row");
    mainDiv.appendChild(tmpRowDiv);
    for (let j = 0; j < drawingSize; j++) {
      var tmpColDiv = document.createElement("div");
      tmpColDiv.classList.add("col_" + j);
      tmpColDiv.classList.add("col");
      tmpRowDiv.appendChild(tmpColDiv);
    }
  }
}

const drawingSize = 16;
createDiv();
