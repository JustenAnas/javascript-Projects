document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", (e) => {
    let display = document.querySelector(".display");
    let val = e.target.innerHTML;
    if (val === "%") {
      display.innerHTML = parseFloat(display.innerHTML) / 100;
    }
    if (val === "±") {
      display.innerHTML = display.innerHTML.startsWith("-")
        ? display.innerHTML.slice(1)
        : "-" + display.innerHTML;
    }
    if (val === "C") {
      display.innerHTML = "";
    } else if (val === "=") {
      try {
        let expr = display.innerHTML
          .replace(/X/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        display.innerHTML = eval(expr);
      } catch {
        display.innerHTML = "Error";
      }
    } else {
      display.innerHTML += val;
    }
  });
});
