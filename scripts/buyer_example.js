const decloud = require("./interact");

function veryHardComputation() {
  let i = 0;
  for (n = 0; n < 10; ++n) {
    i += (n + 1) * 2;
  }
  return i;
}

async function main() {
  let result = await decloud.decloudRun(veryHardComputation, "0.000001");
  console.log("result=", result);
}
main();
