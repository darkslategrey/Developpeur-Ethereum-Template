// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/access/Ownable.sol";

// //patrick collins solidity
// // Uncomment this line to use console.log
// // import "hardhat/console.sol";

// error Guess__AllreadyPlayed();
// error Guess__NotWinnerYet();

// contract Guess is Ownable {
//     string private word;
//     string public hint;
//     address public winner;

//     mapping(address => bool) allreadyPlayed;

//     function getHint() external view returns(string memory) {
//         return hint;
//     }

//     function setWord(string memory _word, string memory _hint) public onlyOwner {
//         word = _word;
//         hint = _hint;
//     }

//     function guess(string memory _word) public view returns(bool) {
//         revert Guess__AllreadyPlayed();

//         if(keccak256(bytes(_word)) == keccak256(bytes(word))) {
//             winner = msg.sender;
//             return true;
//         } else {
//             return false;
//         }
//     }

//     function getWinner() external returns(address) {
//         if(winner == address(0)) {
//             revert Guess__NotWinnerYet();
//         }
//         return winner;
//     }
//     // function withdraw() public {
//     //     // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//     //     // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//     //     require(block.timestamp >= unlockTime, "You can't withdraw yet");
//     //     require(msg.sender == owner, "You aren't the owner");

//     //     emit Withdrawal(address(this).balance, block.timestamp);

//     //     owner.transfer(address(this).balance);
//     // }
// }
//     // event Withdrawal(uint amount, uint when);

//     // constructor(uint _unlockTime) payable {
//     //     require(
//     //         block.timestamp < _unlockTime,
//     //         "Unlock time should be in the future"
//     //     );

//     //     unlockTime = _unlockTime;
//     //     owner = payable(msg.sender);
//     // }
//     // uint public unlockTime;
//     // address payable public owner;
