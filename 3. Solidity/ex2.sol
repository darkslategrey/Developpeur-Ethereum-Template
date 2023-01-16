// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {

    struct Wallet {
        uint balance;
        uint numPayments;
    }

        mapping(address => Wallet) public wallets;

    function getTotalBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getBalance() external view returns (uint) {
        return wallets[msg.sender].balance;
    }

    function withdraw(address payable _to) external returns (bool) {
        uint total = wallets[msg.sender].balance;
        (bool received,) = _to.call{value: total}("");
        if(received) {
            wallets[msg.sender].balance = 0;
            wallets[_to].balance += total;
        }
        return received;
    }

    receive() external payable {
        wallets[msg.sender].balance += msg.value;
        wallets[msg.sender].numPayments++;
    }
}
