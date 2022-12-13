// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MyContract {
    uint public s_number;

    function setNumber(uint _nbr) public {
        s_number = _nbr;
    }
}
