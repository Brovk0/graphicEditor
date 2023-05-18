const state = {
  color: "#7e22c9",
  size: 50,
  shape: "triangle",
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
    ctx.arc(x, y, halfSize, 0, 2 * Math.PI);
    ctx.fillStyle = state.color;
    ctx.fill();
  }

  if (state.shape === "triangle") {
    ctx.beginPath();
    ctx.moveTo(x - halfSize, y + halfSize);
    ctx.lineTo(x + halfSize, y + halfSize);
    ctx.lineTo(x, y - halfSize);
    ctx.closePath();
    ctx.fillStyle = state.color;
    ctx.fill();
  }

  if (state.shape === "text") {
    const textInput = document.querySelector("#text-input");
    const text = textInput.value;
    ctx.fillStyle = state.color;
    ctx.font = state.size + "px Arial";
    ctx.fillText(text, x, y);
  }
});

// Создаем ссылку на кнопку сохранения
const saveButton = document.querySelector("#save-button");

// Обработчик события нажатия на кнопку сохранения
saveButton.addEventListener("click", () => {
  // Создаем ссылку для скачивания
  const downloadLink = document.createElement("a");

  // Создание нового холста с заданным цветом фона
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvasElement.width;
  newCanvas.height = canvasElement.height;
  const newCtx = newCanvas.getContext("2d");
  newCtx.fillStyle = "#ffffff"; // Задайте нужный цвет фона
  newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  // Копирование содержимого текущего холста на новый холст
  newCtx.drawImage(canvasElement, 0, 0);

  // Преобразуем содержимое нового холста в URL-адрес данных
  const imageDataURL = newCanvas.toDataURL("image/png"); // или "image/jpeg"

  // Устанавливаем URL-адрес данных в атрибут href ссылки
  downloadLink.href = imageDataURL;

  // Устанавливаем имя файла для сохранения
  downloadLink.download = "canvas_image.png"; // или "canvas_image.jpg"

  // Добавляем ссылку на страницу
  document.body.appendChild(downloadLink);

  // Нажимаем на ссылку для начала скачивания
  downloadLink.click();

  // Удаляем ссылку из DOM
  document.body.removeChild(downloadLink);
});
