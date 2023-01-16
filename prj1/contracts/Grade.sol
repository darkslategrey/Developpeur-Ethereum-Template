// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./Iface.sol";
import "./Abstr.sol";

contract Grade is Ownable, Iface, Abstr {
    string public teacher;


    struct Student {
        string name;
        uint gradeBio;
        uint gradeMath;
        uint gradeFr;
    }

    Student[] public students;

    function addTeacher(string memory _teacher) public {
        teacher = _teacher;
    }

    function getStudents() public view returns(Student[] memory) {
        return students;
    }

    function addGrades(string memory _name, uint _bio, uint _fr, uint _math) external returns(bool) {
        students.push(Student(_name, _bio, _math, _fr));
        return true;
    }

    function foo() external view override returns(bool) {
        // void
    }
}
