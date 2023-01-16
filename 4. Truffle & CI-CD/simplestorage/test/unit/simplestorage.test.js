const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Units tests of SimpleStorage smart contract", function () {
        let accounts;
        let simplestorage;
        before(async () => {
            accounts = await ethers.getSigners() 
            deployer = accounts[0]
        })

        describe("Deployment", async function() {
            it("should deploy the smart contract", async function() {
                await deployments.fixture(["simplestorage"])
                simplestorage = await ethers.getContract("SimpleStorage")
            })
        })

        describe("Get", async function() {
            it("Should get the number and the number should be equal to 0", async function() {
                let number = await simplestorage.get()
                assert(number.toString() === "0")
            })
        })

        describe("Set", async function() {
            it("should set the number", async function() {
                await simplestorage.set(5)
                let number = await simplestorage.get()
                assert.equal(number.toString(), "5");
            })
        })
    })