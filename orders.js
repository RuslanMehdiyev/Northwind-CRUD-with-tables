network.getAll("/orders").then((res) => {
  res.data.sort((a, b) => {
    return new Date(a.orderDate) - new Date(b.orderDate);
  });
  res.data.forEach((element) => {
    fillTable(element);
  });
});

function fillTable(element) {
  let tr = document.createElement("tr");

  let customerId = document.createElement("td");
  customerId.innerHTML = element.customerId;
  let employeeId = document.createElement("td");
  employeeId.innerHTML = element.employeeId;
  let orderDate = document.createElement("td");
  orderDate.innerHTML = element.orderDate.substring(0, 10);

  tr.appendChild(customerId);
  tr.appendChild(employeeId);
  tr.appendChild(orderDate);
  tbody.append(tr);
}
