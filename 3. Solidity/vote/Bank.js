const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const zeroAddr = "0x0000000000000000000000000000000000000000";
describe("Bank", function () {
  async function deployBankFixture() {
    const [owner, account_1, account_2, account_3] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    return { bank, owner, account_1, account_2, account_3 };
  }

  describe("Deploy", () => {
    it("CAN withdraw if enough credit", async () => {
      const { bank, owner, account_1, account_2 } = await loadFixture(
        deployBankFixture
      );

      const transac = await bank.deposit({ value: 50000 });
      const waited = await transac.wait();

      await bank.withdraw(4000);
      const balance = await owner.getBalance();
      // assert.equal(balance.toString(), "100");

      // console.log(transac);
      await expect(bank.withdraw(1000))
        .to.emit(bank, "EtherWithdrawed")
        .withArgs(owner.address, 1000);
    });

    it("CANNOT withdraw if not enough credit", async () => {
      const { bank, owner, account_1, account_2 } = await loadFixture(
        deployBankFixture
      );

      await bank.deposit({ value: 2000 });
      await expect(bank.withdraw(4000)).to.be.revertedWith("Not enough credit");
    });

    // it("getBalanceAndLastPayment", async () => {
    //   const { bank, owner, account_1, account_2 } = await loadFixture(
    //     deployBankFixture
    //   );
    //   await bank.deposit({ value: 2000 });
    //   expect(
    //     ethers.BigNumber.from(
    //       JSON.parse(JSON.stringify(await bank.getBalanceAndLastPayment()))[0]
    //         .hex
    //     )
    //   ).to.eq({});
    // });

    it("deposit", async () => {
      const { bank, owner, account_1, account_2 } = await loadFixture(
        deployBankFixture
      );
      await expect(bank.deposit({ value: 2000 }))
        .to.emit(bank, "EtherDeposited")
        .withArgs(owner.address, 2000);
    });
  });
});
