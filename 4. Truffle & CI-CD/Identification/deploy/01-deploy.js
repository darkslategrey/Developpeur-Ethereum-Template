const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("--------------------------------------");
  arguments = ["faruch", "greg", 50];
  const Identification = await deploy("Identification", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //Verify the smart contract
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN) {
    log("Verifying...");
    await verify(Identification.address, arguments);
  }
};

module.exports.tags = ["all", "identification"];
