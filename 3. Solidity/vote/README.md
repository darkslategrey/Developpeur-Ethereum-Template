# Voting project

## Problem description

https://formation.alyra.fr/products/developpeur-blockchain/categories/2149052575/posts/2153025072

## Requirements

- node v16.16.0

## Installation

```shell
npm i
# or
yarn
```

## Notes

Voters can vote on proposals with indexes starting at `1`

## Run tests

```shell
npx hardhat test

  Voting
    With owner
      ✔ Check owner (666ms)
      ✔ Can add an address to whitelist
      ✔ Cannot add address(0) to whitelist
      ✔ Start proposals registration
      ✔ Cannot break the workflow
    With unregistered voter
      ✔ Cannot register voter
      ✔ Cannot register proposal
      ✔ Cannot vote (39ms)
      ✔ Cannot see proposals
      ✔ Cannot see winner (38ms)
    With registered voter
      ✔ Cannot register voter
      When PROPOSALS registration session STARTED
        ✔ Can register a proposal
      When PROPOSALS registration session ENDED
        ✔ Cannot register a proposal
      When VOTING session STARTED
        ✔ Cannot vote twice (42ms)
        ✔ Can vote
        ✔ See all proposals
      When VOTING session ENDED
        ✔ Cannot vote
    When VOTING session ENDED
      ✔ Owner count votes (70ms)
      ✔ Voters can check winner (75ms)


  19 passing (1s)
```

## TODO

- Refacto tests to be more DRY
- Deploy contract with `alchemy`
- Create `reactjs` or `nexjs` frontend
