// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error Spa__AlreadyAdopted();
error Spa__IdOutOfRange();

contract Spa {
    struct Animal {
        string race;
        uint size;
        uint age;
        bool isAdopted;
    }

    modifier indexAnimalsRange(uint _idx) {
        require(_idx < animals.length, "Idx out of range");
        _;
    }

    Animal[] animals;
    mapping(address => uint) public adoption;

    event animalAdded(uint indexed id);
    event animalAdopted(uint indexed _id, address indexed _addr);

    //CRUD
    function add(string memory _race, uint _size, uint _age) external {
        animals.push(Animal(_race, _size, _age, false));

        emit animalAdded(animals.length - 1);
    }

    function get(
        uint _id
    ) external view indexAnimalsRange(_id) returns (Animal memory) {
        return animals[_id];
    }

    function set(
        uint _id,
        string memory _race,
        uint _size,
        uint _age
    ) external {
        animals[_id] = Animal(_race, _size, _age, false);
    }

    function remove(uint _id) external indexAnimalsRange(_id) {
        delete animals[_id];
    }

    function adopt(uint _id) external {
        if (animals[_id].isAdopted) {
            revert Spa__AlreadyAdopted();
        }

        adoption[msg.sender] = _id;
        animals[_id].isAdopted = true;
        emit animalAdopted(_id, msg.sender);
    }

    function getAdoption(address _addr) external view returns (Animal memory) {
        uint idx = adoption[_addr];

        return animals[idx];
    }

    function getAnimals() external view returns (Animal[] memory) {
        // uint i;
        // Animal[] memory filteredout;
        // for (; i < animals.length; i++) {
        //     if (animals[i] != 0) {
        //         filteredout.push(animals[i]);
        //     }
        // }
        // return filteredout;
        return animals;
    }

    function adoptIfMax(
        string memory _race,
        uint _maxSize,
        uint _maxAge
    ) external view returns (bool) {
        uint i;

        for (; i < animals.length; i++) {
            if (
                keccak256(abi.encodePacked(_race)) ==
                keccak256(abi.encodePacked(animals[i].race)) &&
                animals[i].size <= _maxSize &&
                animals[i].age <= _maxAge &&
                !animals[i].isAdopted
            ) {
                return true;
            }
        }
        return false;
    }
}

// revertedWithCustomError
