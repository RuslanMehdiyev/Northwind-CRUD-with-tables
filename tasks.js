//En pahali Urun

network.getAll("/products").then((res) => {
  res.data.sort((a, b) => b.unitPrice - a.unitPrice);
  console.log("En pahali Urun: ", res.data[0]);
});


//Ortalama stok miktari

network.getAll("/products").then((res) => {
  let sumOfStock = res.data.reduce((acc, obj) => {
    return acc + obj.unitsInStock;
  }, 0);
  console.log(
    "Ortalama stok miktari: ",
    +(sumOfStock / res.data.length).toFixed(1)
  );
});

//C harfi ile bashlayan urunler

network.getAll("/products").then((res) => {
  let startsWithC = res.data.filter((a) => a.name.startsWith("C"));
  console.log("C harfi ile bashlayan urunler: ", startsWithC);
});

//London's customers

network.getAll("/customers").then((res) => {
  let cityLondon = res.data.filter((e) => e.address?.city == "London");
  console.log("London's customers: ", cityLondon);
});

//Orders between year 1996 and 1997

network.getAll("/orders").then((res) => {
  let filtered = res.data.filter(
    (element) =>
      element.orderDate.substring(0, 4) == "1996" ||
      element.orderDate.substring(0, 4) == "1997"
  );
  console.log("Orders between year 1996 and 1997: ", filtered);
});


// Most Beloved customer
// Most Hated customer

network.getAll("/orders").then((res) => {
  let totalSum = 0;
  res.data.forEach((item) => {
    item.details.forEach(
      (det) =>
        (totalSum = totalSum + det.unitPrice * det.quantity * (1 - det.discount))
    );
    item.total = totalSum.toFixed(1)
  });
  
  let customerOrderInfo = [];
  res.data.forEach((element) => {
    let customer = customerOrderInfo.find((q) => q.customerId == element.customerId);
    if (!customer) {
      let newCustomer = {
        customerId: element.customerId,
        customerTotalAmount: element.total,
      };
      customerOrderInfo.push(newCustomer);
    } else {
      customer.customerTotalAmount = customer.customerTotalAmount + element.total;
    }
  });
  let sortedCustomer = customerOrderInfo.sort(
    (a, b) => b.customerTotalAmount - a.customerTotalAmount
    );
    console.log("Most Beloved customer",sortedCustomer[0]);
    console.log("Most Hated customer",sortedCustomer[customerOrderInfo.length-1]);
});

