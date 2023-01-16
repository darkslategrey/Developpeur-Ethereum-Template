// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Identification is Ownable {
    struct Person {
        string lastName;
        string firstName;
        uint age;
    }

    mapping(address => Person) persons;

    constructor(string memory _lastname, string memory _firstname, uint _age) {
        persons[msg.sender] = Person(_lastname, _firstname, _age);
    }

    function addPerson(
        address _address,
        string memory _lastname,
        string memory _firstname,
        uint _age
    ) external onlyOwner {
        persons[_address] = Person(_lastname, _firstname, _age);
    }

    function getPerson(address _address) external view returns (Person memory) {
        return persons[_address];
    }
}
