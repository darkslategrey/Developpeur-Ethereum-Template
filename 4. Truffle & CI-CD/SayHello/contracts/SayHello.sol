// SPDX-License-Identifier: MIT 
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SayHello is Ownable {

    string private firstName;

    constructor(string memory _firstName) {
        firstName = _firstName;
    }

    function getFirstName() external view returns(string memory) {
        return firstName;
    }

    function setFirstName(string memory _firstName) external onlyOwner {
        firstName = _firstName;
    }

    function sayHello() external view returns(string memory) {
        return string(abi.encodePacked("Hello ", firstName));
    }

}