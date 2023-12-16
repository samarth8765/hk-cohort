/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let obj = {};
  for (let transaction of transactions) {
    obj[transaction.category] =
      (obj[transaction.category] || 0) + transaction.price;
  }

  let output = [];
  for (let category in obj) {
    let tempObj = {};
    tempObj["category"] = category;
    tempObj["totalSpent"] = obj[category];
    output.push(tempObj);
  }

  return output;
}

module.exports = calculateTotalSpentByCategory;
