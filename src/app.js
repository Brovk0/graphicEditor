/** 
 Plan
 0. Explain existing code
 1. Listen tool changes and save in variables.
 3. Draw shape on click.
  - draw on canvas
  - draw shapes
 4. Render future shape on hover.
*/

const state = {
  color: "#7e22c9",
  size: 50,
  shape: "square",
};

const toolbarElement = document.querySelector("#toolbar");

toolbarElement.addEventListener("input", (event) => {
  const name = event.target.name;

  let value;

  if (event.target.type === "range") {
    value = event.target.valueAsNumber;
  } else {
    value = event.target.value;
  }

  state[name] = value;

  console.log(state);
});

const canvasElement = document.querySelector("#canvas");
const canvasRect = canvasElement.getBoundingClientRect();

canvasElement.width = canvasRect.width;
canvasElement.height = canvasRect.height;

const ctx = canvasElement.getContext("2d");

canvasElement.addEventListener("click", (event) => {
  const rect = canvasElement.getBoundingClientRect();
  const x = event.clientX - rect.x;
  const y = event.clientY - rect.y;
  const halfSize = state.size / 2;

  if (state.shape === "square") {
    ctx.fillStyle = state.color;
    ctx.fillRect(x - halfSize, y - halfSize, state.size, state.size);
  }

  if (state.shape === "circle") {
    ctx.beginPath();
    // PI rad === 180 deg
    // 360 = 2 * PI rad
    // x rad = 2 * PI / 360 * y deg
    ctx.arc(x, y, halfSize, 0, 2 * Math.PI);
    ctx.fillStyle = state.color;
    ctx.fill();
  }
});
