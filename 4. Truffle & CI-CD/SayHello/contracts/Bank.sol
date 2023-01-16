// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract Bank {
    mapping(address => uint) balances;

    function withdraw() external {}

    function deposit() external payable {}
}
