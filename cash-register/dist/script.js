function checkCashRegister(price, cash, cid) {
  let change = cash * 100 - price * 100;
  let cidSum = 0;
  let arr = [];
  let result = [];
  let obj = {
    "ONE HUNDRED": 10000,
    "TWENTY": 2000,
    "TEN": 1000,
    "FIVE": 500,
    "ONE": 100,
    "QUARTER": 25,
    "DIME": 10,
    "NICKEL": 5,
    "PENNY": 1
  } 

  for (let key of cid) {
    cidSum += key[1] * 100;
  }

  if (cidSum < change) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  else if (change == cidSum) {
    return {status: "CLOSED", change: cid}
  }
  else {          
    cid = cid.reverse();    
    for (let key of cid) {
      let arr = [key[0], 0];
      key[1] = key[1] * 100;
      while (change >= obj[key[0]] && key[1] > 0) {
        change -= obj[key[0]];
        key[1] -= obj[key[0]];
        arr[1] += obj[key[0]]/100;
      }
      if (arr[1] > 0) {
        result.push(arr);
      }
    }
    if (change > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    }
    return {status: "OPEN", change: result}
  }  
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);