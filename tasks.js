network.getAll("/products").then((res) => {
  res.data.sort((a, b) => b.unitPrice - a.unitPrice);
  console.log("En pahali Urun: ", res.data[0]);
});

network.getAll("/products").then((res) => {
  let sumOfStock = res.data.reduce((acc, obj) => {
    return acc + obj.unitsInStock;
  }, 0);
  console.log(
    "Ortalama stok miktari: ",
    +(sumOfStock / res.data.length).toFixed(1)
  );
});

network.getAll("/products").then((res) => {
  let startsWithC = res.data.filter((a) => a.name.startsWith("C"));
  console.log("C harfi ile bashlayan urunler: ", startsWithC);
});

network.getAll("/customers").then((res) => {
  let cityLondon = res.data.filter((e) => e.address.city == "London");
  console.log("London's customers: ", cityLondon);
});
