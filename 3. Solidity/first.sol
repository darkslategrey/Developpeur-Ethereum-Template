// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract Test {
    struct Wallet {
        uint balance;
        uint numPayments;
    };

    mapping(address => Wallet) public wallets;


    function getTotalBalance() external returns (uint) {
        return self.balance;
    }

    function getBalance() external return (unit) {
        return wallets[msg.sender];
    }

    function withdraw(address payable _to) external (bool) {
        uint total = wallets[msg.sender].balance;
        bool received = _to.send(total);
        if(received) {
            wallets[msg.sender].balance = 0;
        }
    }

   receive() external payable {
       wallets[msg.sender].balance += msg.value;
       wallets[msg.sender].numPayments++;
    }
}
