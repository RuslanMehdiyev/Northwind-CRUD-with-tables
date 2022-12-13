const nameInput = document.getElementById("name");
const descInput = document.getElementById("description");
const addBtn = document.querySelector(".add");
let toast = document.querySelector(".toast");
let toastError = document.querySelector(".toast-error");

let categories = {
  name: nameInput,
  description: descInput,
};

nameInput.addEventListener("input", () => (categories.name = nameInput.value));
descInput.addEventListener(
  "input",
  () => (categories.description = descInput.value)
);

addBtn.addEventListener("click", () => {
  if (!nameInput.value || !descInput.value) {
    alert("Fill inputs");
    return;
  }
  nameInput.value = "";
  descInput.value = "";
  network.postAll(`/categories`, categories);
});
