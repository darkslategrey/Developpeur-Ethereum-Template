// SPDX-License-Identifier: UNLICENSED

pragma solidity =0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    //
    // STRUCTS
    //
    struct Voter {
        bool isRegistred;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    //
    // ENUMS
    //
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    //
    // MODIFIERS
    //
    modifier atStatus(WorkflowStatus _status) {
        require(status == _status, "Incorrect status");
        _;
    }

    modifier onlyWhiteListed(address _voter) {
        require(whitelist[_voter].isRegistred, "Voter not registered");
        _;
    }

    //
    // EVENTS
    //
    event VoterRegistered(address);
    event WorkflowStatusChange(WorkflowStatus, WorkflowStatus);
    event ProposalRegistered(uint);
    event Voted(address, uint);

    //
    // PRIVATE DATA STRUCTURES
    //
    uint winningProposalId;

    // Use array
    mapping(address => Voter) whitelist;

    //
    // PUBLIC DATA STRUCTURES
    //
    Proposal[] public proposals;

    WorkflowStatus status;

    constructor() Ownable() {
        status = WorkflowStatus.RegisteringVoters;
        whitelist[msg.sender] = Voter(true, false, 0);
    }

    //
    // OWNER ONLY
    //
    // CHANGE STATUS
    //
    function addVoter(
        address _voter
    ) external onlyOwner atStatus(WorkflowStatus.RegisteringVoters) {
        require(_voter != address(0), "Cannot whitelist address 0");

        whitelist[_voter] = Voter(true, false, 0);

        emit VoterRegistered(_voter);
    }

    function startProposalsSession()
        external
        onlyOwner
        atStatus(WorkflowStatus.RegisteringVoters)
    {
        nextStage();

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    function endProposalsSession()
        external
        onlyOwner
        atStatus(WorkflowStatus.ProposalsRegistrationStarted)
    {
        nextStage();

        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    function startVotingSession()
        external
        onlyOwner
        atStatus(WorkflowStatus.ProposalsRegistrationEnded)
    {
        nextStage();

        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    function endVotingSession()
        external
        onlyOwner
        atStatus(WorkflowStatus.VotingSessionStarted)
    {
        nextStage();

        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    function countVotes()
        external
        onlyOwner
        atStatus(WorkflowStatus.VotingSessionEnded)
    {
        nextStage();

        uint max = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (uint(proposals[i].voteCount) > max) {
                max = uint(proposals[i].voteCount);
                winningProposalId = i + 1;
            }
        }

        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }

    //
    // END  OWNER ONLY
    //
    // CHANGE STATUS
    //

    //
    // START WHITELISTED VOTERS PUBLIC API
    //
    function registerProposal(
        string memory _proposal
    )
        external
        onlyWhiteListed(msg.sender)
        atStatus(WorkflowStatus.ProposalsRegistrationStarted)
    {
        proposals.push(Proposal(_proposal, 0));

        emit ProposalRegistered(proposals.length);
    }

    function voteForProposal(
        uint _proposalId
    )
        external
        onlyWhiteListed(msg.sender)
        atStatus(WorkflowStatus.VotingSessionStarted)
    {
        require(!whitelist[msg.sender].hasVoted, "Allready voted");
        require(
            _proposalId > 0 && _proposalId <= proposals.length,
            "proposalId not in range"
        );

        whitelist[msg.sender].hasVoted = true;
        whitelist[msg.sender].votedProposalId = _proposalId;
        proposals[_proposalId - 1].voteCount += 1;

        emit Voted(msg.sender, _proposalId);
    }

    function getProposals()
        external
        view
        onlyWhiteListed(msg.sender)
        returns (Proposal[] memory)
    {
        return proposals;
    }

    function getWinner()
        external
        view
        onlyWhiteListed(msg.sender)
        atStatus(WorkflowStatus.VotesTallied)
        returns (Proposal memory)
    {
        return proposals[winningProposalId - 1];
    }

    function getStatus()
        external
        view
        onlyWhiteListed(msg.sender)
        returns (WorkflowStatus)
    {
        return status;
    }

    //
    // END WHITELISTED VOTERS PUBLIC API
    //

    function nextStage() internal {
        status = WorkflowStatus(uint(status) + 1);
    }
}
