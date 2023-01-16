const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

async function deployOneYearLockFixture() {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const Grade = await ethers.getContractFactory("Grade");
  const grade = await Grade.deploy();

  return { grade, unlockTime, lockedAmount, owner, otherAccount };
}

/// const { grade, owner } = await loadFixture(deployOneYearLockFixture);

describe("Grade", function () {
  it("add a teacher", async function () {
    const { grade, owner } = await loadFixture(deployOneYearLockFixture);
    await grade.addTeacher("Turpin");
    await expect(await grade.teacher()).to.equal("Turpin");
  });

  it("addGrades", async function () {
    const { grade, owner } = await loadFixture(deployOneYearLockFixture);
    await grade.addGrades("joe", 1, 2, 3);
    await expect(JSON.stringify(await grade.getStudents())).to.equal(
      '[["joe",{"type":"BigNumber","hex":"0x01"},{"type":"BigNumber","hex":"0x03"},{"type":"BigNumber","hex":"0x02"}]]'
    );
  });

  // describe("getGradeAverageStudent", function () {});
  // describe("getGradeAverageOfClassInASubject", function () {});
  // describe("getAverageGradeOfClass", function () {});
});
