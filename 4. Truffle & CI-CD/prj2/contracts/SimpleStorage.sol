// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract SimpleStorage {
    uint number;

    function setNumber(uint _number) external {
        number = _number;
    }

    function getNumber() external view returns (uint) {
        return number;
    }
}
