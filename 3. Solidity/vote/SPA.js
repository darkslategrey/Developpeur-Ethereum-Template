const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("SPA", function () {
  async function deploySPAFixture() {
    const [owner, account_1, account_2, account_3] = await ethers.getSigners();

    const SPA = await ethers.getContractFactory("Spa");
    const spa = await SPA.deploy();

    return { spa, owner, account_1, account_2, account_3 };
  }

  it("Add", async () => {
    const { spa, owner, account_1, account_2 } = await deploySPAFixture();
    await spa.add("doberman", 70, 10);
    await spa.add("staff", 60, 5);
    await spa.add("german sheppard", 60, 5);

    const animals = await spa.getAnimals();

    expect(animals.length).to.eq(3);
    expect(animals[0][0]).to.eq("doberman");
  });

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
});
