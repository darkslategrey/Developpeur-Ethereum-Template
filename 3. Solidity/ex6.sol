// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

import "./Owner.sol";

contract Saving is Owner {

    struct Transactions {
       uint ts;
        uint
    }
    mapping(uint idx => uint amount) transactions;

    transactions[] history;

    constructor {
        owner = msg.sender;
    }

    function sendEth() public payable {
        transactions.push()[block.timestamp] = msg.value;
    }

    function getFunds() public payable onlyOwner {

    }

}
