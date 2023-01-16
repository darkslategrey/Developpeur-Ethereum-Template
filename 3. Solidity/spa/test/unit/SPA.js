const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Units tests of SPA smart contract", function () {
      let accounts;
      let simplestorage;
      let spa;

      before(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["spa"]);

        spa = await ethers.getContract("Spa");
      });

      describe("CRUD", () => {
        it("Add", async () => {
          // const { spa, owner, account_1, account_2 } = await deploySPAFixture();

          let animals = await spa.getAnimals();
          expect(animals.length).to.eq(0);

          await spa.add("doberman", 70, 10);
          await spa.add("staff", 60, 5);
          await spa.add("german sheppard", 60, 5);

          animals = await spa.getAnimals();

          expect(animals.length).to.eq(3);
          expect(animals[0][0]).to.eq("doberman");
        });
      });
    });

// describe("SPA", function () {
//   async function deploySPAFixture() {
//     const [owner, account_1, account_2, account_3] = await ethers.getSigners();

//     const SPA = await ethers.getContractFactory("Spa");
//     const spa = await SPA.deploy();

//     return { spa, owner, account_1, account_2, account_3 };
//   }

// it("Get", async () => {
//   const { spa, owner, account_1, account_2 } = await deploySPAFixture();
//   await spa.add("doberman", 70, 10);

//   const animal = await spa.get(0);

//   expect(animal[0]).to.eq("doberman");
// });

// it("Remove", async () => {
//   const { spa, owner, account_1, account_2 } = await deploySPAFixture();
//   await spa.add("doberman", 70, 10);
//   await spa.add("staff", 60, 5);
//   await spa.add("german sheppard", 60, 5);

//   await spa.remove(0);
//   await spa.remove(2);
//   await expect(spa.remove(5)).to.be.revertedWith("Idx out of range");

//   const animals = await spa.getAnimals();
//   const formated = JSON.parse(JSON.stringify(animals));
//   console.log(formated);
//   expect(formated).to.eq({});
// });
