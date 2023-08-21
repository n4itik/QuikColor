const inputForm = document.getElementById("input-form");
const colorInput = document.getElementById("color-input");
const modeInput = document.getElementById("mode-input");
const colorContainer = document.querySelector(".color-container");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchColors();
});

function fetchColors() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${
      modeInput.value
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      const colorsArray = [];
      data.colors.forEach((color) => {
        colorsArray.push(color.hex.value);
      });
      renderColors(colorsArray);
    });
}

function renderColors(colors) {
  document.querySelector(
    ".container"
  ).style.border = `5px solid ${colorInput.value}`;

  let colorsHtml = "";
  for (let i = 1; i <= 5; i++) {
    colorsHtml += `<div class="color" id="color-${i}">
                     <div class="color-preview"></div>
                     <div class="color-code">${colors[i - 1]}</div>
                   </div>`;
  }
  colorsHtml += `<div class="copy-message"></div>`;

  colorContainer.innerHTML = colorsHtml;

  for (let i = 1; i <= 5; i++) {
    document
      .getElementById(`color-${i}`)
      .querySelector(".color-preview").style.backgroundColor = colors[i - 1];
  }

  const colorDivs = document.getElementsByClassName("color");
  [...colorDivs].forEach((color) => {
    color.addEventListener("click", () => {
      const colorCode = color.querySelector(".color-code").innerText;
      navigator.clipboard.writeText(colorCode);

      const copyMessage = document.querySelector(".copy-message");
      colorContainer.appendChild(copyMessage);
      copyMessage.innerText = `${colorCode} is copied.`;
      copyMessage.style.display = "block";
      setTimeout(() => {
        copyMessage.style.display = "none";
      }, 1000);
    });
  });
}

fetchColors();
