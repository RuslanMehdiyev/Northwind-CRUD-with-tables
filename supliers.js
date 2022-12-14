const tbody = document.getElementById("tbody");

network.getAll("/suppliers").then((res) => {
  res.data.forEach((element) => {
    fillTable(element);
  });
});

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
  let region = document.createElement("td");
  region.innerHTML = element?.address?.region;
  tr.appendChild(Id);
  tr.appendChild(companyName);
  tr.appendChild(contactName);
  tr.appendChild(contactTitle);
  tr.appendChild(region);

  tbody.appendChild(tr);
}
