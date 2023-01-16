const hre = require("hardhat");

async function main() {
  const Bank = await hre.ethers.getContractFactory("Bank");
  const bank = await Bank.deploy("Jean");

  await bank.deployed();

  console.log(`bank deployed at address : ${bank.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
