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
      let tmpString = "row_" + i + "_col_" + j;
      tmpColDiv.classList.add(tmpString);
      tmpColDiv.classList.add("col");
      tmpColDiv.setAttribute("id", tmpString);
      tmpRowDiv.appendChild(tmpColDiv);
    }
  }
}

const drawingSize = 16;
createDiv();
