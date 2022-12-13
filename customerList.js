function getAll() {
  network.getAll("/customers").then((res) => {
    let sortedResponse = res.data.sort((a, b) => {
      if (a.companyName < b.companyName) {
        return -1;
      }
      if (a.companyName > b.companyName) {
        return 1;
      }
      return 0;
    });
    sortedResponse.forEach((element) => {
      fillTable(element);
    });
  });
}

getAll();

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

  tr.appendChild(Id);
  tr.appendChild(companyName);
  tr.appendChild(contactName);
  tr.appendChild(buttonDelete);
  tbody.append(tr);

  buttonDelete.addEventListener("click", () => {
    tbody.innerHTML = "";
    let id = buttonDelete.getAttribute("id");
    network.deleteMethod("/customers", `/${id}`).then(getAll);
  });
}
