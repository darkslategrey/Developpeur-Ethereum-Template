// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract Tab {
    uint[] public array;


    function add(uint _nbr) public {
        array.push(_nbr);
    }

    function del(uint _idx) public {
        delete array[_idx];
    }

    function update(uint _idx, uint _val) public {
        array[_idx] = _val;
    }

    function mulByTen(uint[] memory _data) public pure returns(uint[] memory) {
        uint length = _data.length;
        uint[] memory copy = new uint[](length);

        for(uint i = 0; i < length; i++) {
            copy[i] = _data[i] * 10;
        }
        return copy;
    }
}
