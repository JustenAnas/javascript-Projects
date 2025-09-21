const populate = async (currency, value) => {
  let myStr = "";
  const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_EkAfaVJsN2tPSXZDFO5Y5whqyB3dfm8Ehw39ovgM&base_currency=${currency}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rJson = await response.json();
    console.log(rJson); // check what comes back

    if (!rJson.data) {
      throw new Error("No data returned from API");
    }

    let index = 1;
    for (let key of Object.keys(rJson.data)) {
      myStr += `
        <tr>
          <th scope="row">${index++}</th>
          <td>${key}</td>
          <td>${rJson.data[key].code}</td>
          <td>${Math.round(rJson.data[key].value * value)}</td>
        </tr>
      `;
    }

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = myStr;
    document.querySelector(".output").style.display = "block";

  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
};

// Attach events to buttons
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault(); // stop form submit refresh
    const value = parseInt(document.querySelector("input[name=quantity]").value);
    const currency = document.querySelector("input[name=currency]").value.trim().toUpperCase();

    if (!currency || isNaN(value)) {
      alert("Enter a valid currency code and amount");
      return;
    }

    populate(currency, value);
  });
});
