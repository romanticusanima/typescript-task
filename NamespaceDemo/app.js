/// <reference path="utility-functions.ts" />
var fee = Utility.Fees.calculateLateFee(10);
console.log(fee);
var util = Utility.Fees;
console.log(util.calculateLateFee(47));
