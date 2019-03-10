/// <reference path="utility-functions.ts" />

const fee = Utility.Fees.calculateLateFee(10);
console.log(fee);

import util = Utility.Fees;
console.log(util.calculateLateFee(47));