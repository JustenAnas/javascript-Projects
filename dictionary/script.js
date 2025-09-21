const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let word = document.getElementById("word").value;

  fetch(`/searchword?entry=${word}`)
    .then((res) => res.json())
    .then((resp) => {
      console.log(resp);
      if (resp.list && resp.list.length > 0) {
        alert(resp.list[0].definition);
      } else {
        alert("No definition found");
      }
    })
    .catch((err) => console.error("Error:", err));
});
