// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract Owner {
    address owner;

    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
    }
}
