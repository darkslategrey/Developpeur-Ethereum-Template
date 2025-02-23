const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const zeroAddr = "0x0000000000000000000000000000000000000000";
const WorkflowStatus = {
  RegisteringVoters: 0,
  ProposalsRegistrationStarted: 1,
  ProposalsRegistrationEnded: 2,
  VotingSessionStarted: 3,
  VotingSessionEnded: 4,
  VotesTallied: 5,
};

describe("Voting", function () {
  async function deployVotingFixture() {
    const [owner, account_1, account_2, account_3] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    return { voting, owner, account_1, account_2, account_3 };
  }

  describe("With owner", function () {
    it("Check owner", async function () {
      const { voting, owner } = await loadFixture(deployVotingFixture);
      expect(await voting.owner()).to.equal(owner.address);
    });

    it("Can add an address to whitelist", async function () {
      const { voting, owner, account_1 } = await loadFixture(
        deployVotingFixture
      );
      await expect(voting.addVoter(account_1.address))
        .to.emit(voting, "VoterRegistered")
        .withArgs(account_1.address);
    });

    it("Cannot add address(0) to whitelist", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      await expect(voting.addVoter(zeroAddr)).to.be.revertedWith(
        "Cannot whitelist address 0"
      );
    });

    it("Start proposals registration", async function () {
      const { voting } = await loadFixture(deployVotingFixture);

      await expect(voting.startProposalsSession())
        .to.emit(voting, "WorkflowStatusChange")
        .withArgs(
          WorkflowStatus.RegisteringVoters,
          WorkflowStatus.ProposalsRegistrationStarted
        );
      expect(await voting.getStatus()).to.eq(
        WorkflowStatus.ProposalsRegistrationStarted
      );
    });

    it("Cannot break the workflow", async function () {
      const { voting } = await loadFixture(deployVotingFixture);

      expect(await voting.getStatus()).to.eq(WorkflowStatus.RegisteringVoters);

      await expect(voting.startVotingSession()).to.be.revertedWith(
        "Incorrect status"
      );
    });
  });

  describe("With unregistered voter", function () {
    it("Cannot register voter", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );

      await expect(
        voting.connect(account_1).addVoter(account_2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Cannot register proposal", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);
      await voting.startProposalsSession();

      await expect(
        voting.connect(account_2).registerProposal("prop 1")
      ).to.be.revertedWith("Voter not registered");
    });

    it("Cannot vote", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);
      await voting.startProposalsSession();
      await voting.connect(account_1).registerProposal("prop 1");
      await voting.endProposalsSession();
      await voting.startVotingSession();

      await expect(
        voting.connect(account_2).voteForProposal(1)
      ).to.be.revertedWith("Voter not registered");
    });

    it("Cannot see proposals", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);

      await voting.startProposalsSession();
      await voting.connect(account_1).registerProposal("prop 1");

      await expect(voting.connect(account_2).getProposals()).to.be.revertedWith(
        "Voter not registered"
      );
    });

    it("CAN NOT see status", async function () {
      const { voting, owner, account_1 } = await loadFixture(
        deployVotingFixture
      );
      await expect(voting.connect(account_1).getStatus()).to.be.revertedWith(
        "Voter not registered"
      );
    });

    it("Cannot see winner", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);

      await voting.startProposalsSession();
      await voting.endProposalsSession();
      await voting.startVotingSession();
      await voting.endVotingSession();
      await expect(voting.countVotes());
      await expect(voting.connect(account_2).getWinner()).to.be.revertedWith(
        "Voter not registered"
      );
    });
  });

  describe("With registered voter", function () {
    it("CAN see status", async function () {
      const { voting, owner, account_1 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);

      expect(await voting.connect(account_1).getStatus()).to.be.eq(
        WorkflowStatus.RegisteringVoters
      );
    });

    it("CANNOT register voter", async function () {
      const { voting, owner, account_1, account_2 } = await loadFixture(
        deployVotingFixture
      );
      await voting.addVoter(account_1.address);
      await expect(
        voting.connect(account_1).addVoter(account_2.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    describe("When PROPOSALS registration session STARTED", function () {
      let voting;
      let account_1;

      before(async () => {
        const values = await loadFixture(deployVotingFixture);
        voting = values.voting;
        account_1 = values.account_1;
        await voting.addVoter(account_1.address);
        await voting.startProposalsSession();
      });

      it("CAN register a proposal", async function () {
        await expect(voting.connect(account_1).registerProposal("prop 1"))
          .to.emit(voting, "ProposalRegistered")
          .withArgs(1);
      });

      it("CANNOT register an empty proposal", async function () {
        await expect(
          voting.connect(account_1).registerProposal("")
        ).to.be.revertedWith("Proposal cannot be empty");
      });
    });

    describe("When PROPOSALS registration session ENDED", async function () {
      it("CANNOT register a proposal", async function () {
        const { voting, owner, account_1, account_2 } = await loadFixture(
          deployVotingFixture
        );
        await voting.addVoter(account_1.address);
        await voting.startProposalsSession();
        await voting.endProposalsSession();

        await expect(
          voting.connect(account_1).registerProposal("prop 1")
        ).to.be.revertedWith("Incorrect status");
      });
    });

    describe("When VOTING session STARTED", function () {
      let voting, account_1, account_2;

      beforeEach(async () => {
        const values = await loadFixture(deployVotingFixture);
        voting = values.voting;
        account_1 = values.account_1;
        account_2 = values.account_2;
        await voting.addVoter(account_1.address);
        await voting.addVoter(account_2.address);
        await voting.startProposalsSession();
        await voting.connect(account_1).registerProposal("prop 1");
        await voting.connect(account_2).registerProposal("prop 2");
        await voting.endProposalsSession();
        await voting.startVotingSession();
      });

      it("CAN vote", async function () {
        await expect(voting.connect(account_1).voteForProposal(1))
          .to.emit(voting, "Voted")
          .withArgs(account_1.address, 1);
      });

      it("CANNOT vote twice", async function () {
        await voting.connect(account_1).voteForProposal(1);
        await expect(
          voting.connect(account_1).voteForProposal(1)
        ).to.be.revertedWith("Allready voted");
      });

      it("CAN see all proposals", async function () {
        const attendee =
          '[["prop 1",{"type":"BigNumber","hex":"0x00"}],["prop 2",{"type":"BigNumber","hex":"0x00"}]]';
        const proposals = await voting.connect(account_1).getProposals();
        expect(JSON.stringify(proposals)).to.eq(attendee);
      });
    });
  });

  describe("When VOTING session ENDED", function () {
    let voting, account_1, account_2, account_3;

    beforeEach(async function () {
      const values = await loadFixture(deployVotingFixture);

      voting = values.voting;
      account_1 = values.account_1;
      account_2 = values.account_2;
      account_3 = values.account_3;

      await voting.addVoter(account_1.address);
      await voting.addVoter(account_2.address);
      await voting.addVoter(account_3.address);

      await voting.startProposalsSession();
      await voting.connect(account_1).registerProposal("prop 1");
      await voting.connect(account_2).registerProposal("prop 2");
      await voting.endProposalsSession();

      await voting.startVotingSession();
      await voting.connect(account_1).voteForProposal(1);
      await voting.connect(account_2).voteForProposal(1);
      await voting.connect(account_3).voteForProposal(2);
      await voting.endVotingSession();
    });

    it("CANNOT vote", async function () {
      await expect(
        voting.connect(account_1).voteForProposal(1)
      ).to.be.revertedWith("Incorrect status");
    });

    it("Owner CAN count votes", async function () {
      await expect(voting.countVotes())
        .to.emit(voting, "WorkflowStatusChange")
        .withArgs(
          WorkflowStatus.VotingSessionEnded,
          WorkflowStatus.VotesTallied
        );
    });

    it("Voters CAN check winner", async function () {
      await expect(voting.countVotes());

      const winner = JSON.parse(
        JSON.stringify(await voting.connect(account_1).getWinner())
      );
      expect(winner[0][0] == "prop 1");
    });
  });
});
