const popUp = document.querySelector(".pop-up");
const editUpdate = document.getElementById("formUpdate");
const closeModal = document.querySelector(".closeModal");
const companyEditName = document.getElementById("companyName");
const contactEditName = document.getElementById("contactName");
const formUpdate = document.getElementById("formUpdate");
let elementId;
function getAllFunc() {
  network.getAll("/customers").then((res) => {
    let sortedResponse = res.data.sort((a, b) => {
      if (a.companyName?.toLowerCase() < b.companyName?.toLowerCase()) {
        return -1;
      }
      if (a.companyName?.toLowerCase() > b.companyName?.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    sortedResponse.forEach((element) => {
      fillTable(element);
    });
  });
}

getAllFunc();

function fillTable(element) {
  let tr = document.createElement("tr");
  let Id = document.createElement("td");
  Id.innerHTML = element.id;
  let companyName = document.createElement("td");
  companyName.innerHTML = element.companyName;
  let contactName = document.createElement("td");
  contactName.innerHTML = element.contactName;
  let contactTitle = document.createElement("td");
  contactTitle.innerHTML = element.contactTitle;
  let buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("id", element.id);
  buttonDelete.innerHTML = "Delete";
  let buttonUpdate = document.createElement("button");
  buttonUpdate.setAttribute("id", element.id);
  buttonUpdate.innerHTML = "Update";

  tr.appendChild(Id);
  tr.appendChild(companyName);
  tr.appendChild(contactName);
  tr.appendChild(buttonDelete);
  tr.appendChild(buttonUpdate);
  tbody.append(tr);

  buttonDelete.addEventListener("click", () => {
    tbody.innerHTML = "";
    let id = buttonDelete.getAttribute("id");
    network.deleteMethod("/customers", `/${id}`).then(() => getAllFunc());
  });

  buttonUpdate.addEventListener("click", function (e) {
    popUp.style.display = "block";
    let trEl = e.target.parentNode;
    let tdEl = [...trEl.getElementsByTagName("td")];
    elementId = tdEl[0].innerHTML;
    companyEditName.value = tdEl[1].innerHTML;
    contactEditName.value = tdEl[2].innerHTML;
  });
}

formUpdate.addEventListener("click", () => {
  if (companyEditName.value == "") {
    alert("Fill All Inputs");
    return;
  } else if (contactEditName.value == "") {
    alert("Fill All Inputs");

    return;
  }
  const newObject = {
    companyName: companyEditName.value,
    contactName: contactEditName.value,
  };
  tbody.innerHTML = "";
  network
    .putMethod("/customers", elementId, newObject)
    .then(() => getAllFunc());
  companyEditName.value = "";
  contactEditName.value = "";
  popUp.style.display = "none";
});

closeModal.addEventListener("click", () => {
  popUp.style.display = "none";
});
