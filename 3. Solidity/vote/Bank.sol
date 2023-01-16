// SPDX-License-Identifier: UNLICENSED

pragma solidity =0.8.17;

contract Bank {
    struct Account {
        uint balance;
        uint lastDeposit;
    }

    mapping(address => Account) private accounts;

    event EtherDeposited(address indexed, uint);
    event EtherWithdrawed(address indexed, uint);

    function getBalanceAndLastDeposit() external view returns (Account memory) {
        return accounts[msg.sender];
    }

    function withdraw(uint _amount) external {
        require(accounts[msg.sender].balance >= _amount, "Not enough credit");

        accounts[msg.sender].balance -= _amount;
        (bool received, ) = msg.sender.call{value: _amount}("");
        require(received, "An error occured");

        emit EtherWithdrawed(msg.sender, _amount);
    }

    function deposit() external payable {
        accounts[msg.sender].balance += msg.value;
        accounts[msg.sender].lastDeposit = block.timestamp;

        emit EtherDeposited(msg.sender, msg.value);
    }
}
