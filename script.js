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
      let tmpString = "row_" + i + "_col_" + j;
      tmpColDiv.classList.add(tmpString);
      tmpColDiv.classList.add("col");
      tmpColDiv.setAttribute("id", tmpString);
      tmpRowDiv.appendChild(tmpColDiv);
      tmpRowDiv.addEventListener("mouseover", easMouseOver);
    }
  }
}

createDiv();
var drawingSize = 16; // change to allow for sketch resize
