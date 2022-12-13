const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", //   Any network (default: none)
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(`${process.env.pk}`, `${process.env.infura}`),
      network_id: 5,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.17",
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
};
