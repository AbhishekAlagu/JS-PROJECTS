function appendToDisplay(value) {
  document.getElementById("input").value += value;
}

function clearinput() {
  document.getElementById("input").value = "";
}

function deleteelement() {
  let display = document.getElementById("input");
  display.value = display.value.slice(0, -1);
}
function calculate(value) {
  try {
    document.getElementById("input").value = eval(
      document.getElementById("input").value
    );
  } catch {
    let display = document.getElementById("input");
    display.value = "ERROR";
    display.style.color = "red";
  }
}
