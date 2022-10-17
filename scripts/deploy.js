async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy();
  const resp = await hello_world.deployed();
  console.log("resp: ", resp);
  console.log("Contract deployed to address:", hello_world.address);
  //Contract deployed to address: 0xED473012d71E1458d059469e1500380Ce8945890
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
