const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

ethers.BigNumber.add(amount);
parseEther();
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Units tests of Alyraerc20 smart contract", function () {
      let accounts;
      let alyraerc;
      before(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
      });

      describe("Deployment", async function () {
        it("check balance", async function () {
          await deployments.fixture(["erc20"]);
          alyraerc = await ethers.getContract("AlyraIsERC20");
          console.log(deployer.address);
          let balance = await alyraerc.balanceOf(deployer.address);
          await expect(ethers.utils.formatEther(balance)).to.eq("1000000.0");
        });

        it("can be minted by only owner", async function () {
          await deployments.fixture(["erc20"]);
          alyraerc = await ethers.getContract("AlyraIsERC20");
          await expect(
            alyraerc
              .connect(accounts[1])
              .mint(accounts[2].address, 100_000_000_000)
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Can mint to an account", async function () {
          await deployments.fixture(["erc20"]);
          alyraerc = await ethers.getContract("AlyraIsERC20");
          await alyraerc.mint(accounts[1].address, 100_000_000_000_000);
          const balance = await alyraerc.balanceOf(accounts[1].address);
          const bn = ethers.utils.formatEther(balance);
          console.log({ bn });
          await expect(ethers.utils.formatEther(balance.toString()) == "1");
          //   .toString;
          // await expect(ethers.utils.formatEther(balance), 10);
          // );
        });
        it("cannot mint to address[0]", async function () {
          await deployments.fixture(["erc20"]);
          alyraerc = await ethers.getContract("AlyraIsERC20");
          await expect(
            alyraerc.mint(ethers.constants.AddressZero, 100_000)
          ).to.be.revertedWith("ERC20: mint to the zero address");
        });
      });
    });
