# Voting project

## Problem description

https://formation.alyra.fr/products/developpeur-blockchain/categories/2149052575/posts/2153025072

## Requirements

- node v16.16.0

## Installation

```shell
npm i
```

## Notes

Voters can vote on proposals with indexes starting at `1`

## Run tests

```shell
npx hardhat coverage

Version
=======
> solidity-coverage: v0.8.2

Instrumenting for coverage...
=============================

> Voting.sol

Compilation:
============

Compiled 3 Solidity files successfully

Network Info
============
> HardhatEVM: v2.12.4
> network:    hardhat



  Voting
    With owner
      ✔ Check owner (232ms)
      ✔ Can add an address to whitelist
      ✔ Cannot add address(0) to whitelist (44ms)
      ✔ Start proposals registration
      ✔ Cannot break the workflow
    With unregistered voter
      ✔ Cannot register voter
      ✔ Cannot register proposal (40ms)
      ✔ Cannot vote (73ms)
      ✔ Cannot see proposals (44ms)
      ✔ CAN NOT see status
      ✔ Cannot see winner (70ms)
    With registered voter
      ✔ CAN see status
      ✔ CANNOT register voter
      When PROPOSALS registration session STARTED
        ✔ CAN register a proposal
        ✔ CANNOT register an empty proposal
      When PROPOSALS registration session ENDED
        ✔ CANNOT register a proposal (42ms)
      When VOTING session STARTED
        ✔ CAN vote
        ✔ CANNOT vote twice
        ✔ CAN see all proposals
    When VOTING session ENDED
      ✔ CANNOT vote
      ✔ Owner CAN count votes
      ✔ Voters CAN check winner


  22 passing (1s)

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |      100 |    78.57 |      100 |      100 |                |
  Voting.sol |      100 |    78.57 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|
All files    |      100 |    78.57 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|
```

## TODO

- Deploy contract with `alchemy`
- Create `reactjs` or `nexjs` frontend
- ...
