// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Hello is Ownable {
    string firstname;

    constructor(string memory _firstname) {
        firstname = _firstname;
    }

    function setFirstname(string memory _firstname) external onlyOwner {
        firstname = _firstname;
    }

    function getFirstname() external view returns (string memory) {
        return firstname;
    }

    function sayHello() external returns (string memory) {
        return string.concat("Hello ", firstname);
    }
}
