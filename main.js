let result = document.querySelector(".result header");
let min = document.querySelector(".min");
let firstNum = "";
let secondNum = "";

min.addEventListener("click", (e) => {
  if (e.target.nodeName == "DIV" || e.target.nodeName == "I") {
    if (result.textContent === "ERROR") {
      result.textContent = "";
    }
    let text = e.target.textContent;
    switch (true) {
      //=====================================================
      case e.target.classList.contains("AC"):
        clear();
        break;

      case e.target.classList.contains("fa-delete-left") ||
        e.target.classList.contains("delete"):
        deleteValue();
        break;

      //===================================================== %
      case e.target.classList.contains("fa-percent") ||
        e.target.classList.contains("percent"):
        percent();
        break;

      //===================================================== /
      case e.target.classList.contains("fa-divide") ||
        e.target.classList.contains("divide"):
        if (
          result.textContent.includes("/") ||
          result.textContent.includes("*") ||
          result.textContent.includes("-") ||
          result.textContent.includes("+")
        ) {
          equals();
        }
        addItem("/");
        break;

      //===================================================== *
      case e.target.classList.contains("fa-xmark") ||
        e.target.classList.contains("multiply"):
        if (
          result.textContent.includes("/") ||
          result.textContent.includes("*") ||
          result.textContent.includes("-") ||
          result.textContent.includes("+")
        ) {
          equals();
        }
        addItem("*");
        break;

      //===================================================== -
      case e.target.classList.contains("fa-minus") ||
        e.target.classList.contains("minus"):
        if (
          result.textContent.includes("/") ||
          result.textContent.includes("*") ||
          result.textContent.includes("-") ||
          result.textContent.includes("+")
        ) {
          equals();
        }
        addItem("-");
        break;

      //===================================================== +
      case e.target.classList.contains("fa-plus") ||
        e.target.classList.contains("plus"):
        if (
          result.textContent.includes("/") ||
          result.textContent.includes("*") ||
          result.textContent.includes("-") ||
          result.textContent.includes("+")
        ) {
          equals();
        }
        addItem("+");
        break;

      //===================================================== dot
      case e.target.classList.contains("dot"):
        addItem(".");
        break;

      //===================================================== =
      case e.target.classList.contains("fa-equals") ||
        e.target.classList.contains("equals"):
        equals();
        break;

      default:
        addItem(e.target.textContent);
    }
  }
});

function clear() {
  result.textContent = "";
}

function deleteValue() {
  if (
    result.textContent.includes("/") ||
    result.textContent.includes("*") ||
    result.textContent.includes("-") ||
    result.textContent.includes("+")
  ) {
    secondNum = secondNum.slice(0, -1);
  }

  if (
    !result.textContent.includes("/") &&
    !result.textContent.includes("*") &&
    !result.textContent.includes("-") &&
    !result.textContent.includes("+")
  ) {
    firstNum = firstNum.toString().slice(0, -1);
  }
  let newValue = result.textContent;
  result.textContent = newValue.substring(0, newValue.length - 1);
}

function equals() {
  console.log("equals");
}

function addItem(value) {
  result.textContent += value;
  if (value === ".") {
    if (
      result.textContent.includes("/") ||
      result.textContent.includes("*") ||
      result.textContent.includes("-") ||
      result.textContent.includes("+")
    ) {
      secondNum = secondNum.toString() + ".";
      return;
    }
    if (
      !result.textContent.includes("/") ||
      !result.textContent.includes("*") ||
      !result.textContent.includes("-") ||
      !result.textContent.includes("+")
    ) {
      firstNum = firstNum.toString() + ".";
    }
  }

  if (
    !isNaN(Number(value)) &&
    !result.textContent.includes("/") &&
    !result.textContent.includes("*") &&
    !result.textContent.includes("-") &&
    !result.textContent.includes("+")
  ) {
    firstNum += value;
    console.log(firstNum);
  }

  if (!isNaN(Number(value))) {
    if (
      result.textContent.includes("/") ||
      result.textContent.includes("*") ||
      result.textContent.includes("-") ||
      result.textContent.includes("+")
    ) {
      secondNum += value;
      console.log(secondNum);
    }
  }
}

function percent() {
  equals();
  let firstResult = Number(firstNum) / 100;
  firstNum = firstResult;
  secondNum = "";
  result.textContent = firstResult;
}

function equals() {
  if (result.textContent.includes("/")) {
    if (Number(secondNum) === 0) {
      result.textContent = "ERROR";
      firstNum = "";
      secondNum = "";
      return;
    }
    let firstResult = Number(firstNum) / Number(secondNum);
    firstNum = firstResult;
    secondNum = "";
    result.textContent = firstNum;
  }
  if (result.textContent.includes("*")) {
    let firstResult = Number(firstNum) * Number(secondNum);
    firstNum = firstResult;
    secondNum = "";
    result.textContent = firstNum;
  }
  if (result.textContent.includes("+")) {
    let firstResult = Number(firstNum) + Number(secondNum);
    firstNum = firstResult;
    secondNum = "";
    result.textContent = firstNum;
  }
  if (result.textContent.includes("-")) {
    let firstResult = Number(firstNum) - Number(secondNum);
    firstNum = firstResult;
    secondNum = "";
    result.textContent = firstNum;
  }
}

function findButtonByText(text) {
  const buttons = document.querySelectorAll(".buttons div");
  for (let button of buttons) {
    if (button.textContent.trim() === text) {
      return button;
    }
  }
  return null;
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  let button;
  if (!isNaN(key)) {
    button = findButtonByText(key);
  } else {
    switch (key) {
      case ".":
        button = document.querySelector(".dot");
        break;
      case "+":
        button = document.querySelector(".plus");
        break;
      case "-":
        button = document.querySelector(".minus");
        break;
      case "*":
        button = document.querySelector(".multiply");
        break;
      case "/":
        button = document.querySelector(".divide");
        break;
      case "Enter":
        button = document.querySelector(".equals");
        break;
      case "Backspace":
        button = document.querySelector(".delete");
        break;
      case "Escape":
        button = document.querySelector(".AC");
        break;
    }
  }

  if (button) {
    button.click();
  }
});
