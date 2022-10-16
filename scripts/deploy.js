async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy();
  console.log("Contract deployed to address:", hello_world.address);
  //Contract deployed to address: 0xCa0498cE3637Af2a94C79C3d1FA1854a5a66eec7
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
