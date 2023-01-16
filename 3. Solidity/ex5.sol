// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

contract Transfert {

    address public me;

    modifier gtOneWei(){
        require(msg.value > 1, "Min 1 wei to send");
        _;
    }

    function setAddr(address change) public {
        require(change != address(0), "Do not send money to address 0")
        me = change;
    }

    function getBalance() public view returns (uint) {
        return me.balance;
    }

    function getBalance(address addr) public view returns (uint) {
        return addr.balance;
    }

    function transfert(address _to) gtOneWei() public payable {
        (bool received,) = _to.call{value: msg.value}("");

        require(received, "Not sent");
    }

    function transfertToMe(uint min) gtOneWei() public payable {
        require(me.balance > min, "Not enough balance");

        (bool received,) = me.call{value: msg.value}("");
        require(received, "Not sent");
    }
}
