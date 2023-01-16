// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.7 <0.9.0;

error PlayList__NotTheOwner();
error PlayList__ContractPaused();

contract PlayList {
    address immutable i_owner;
    bool public paused;

    struct Track {
        string artist;
        string title;
        uint bpm;
    }

        struct Playlist {
            string name;
            Track[] tracks;
        }

        mapping(address => Playlist) public playlists;

    constructor() {
        i_owner = msg.sender;
    }

    function setPaused(bool _paused) public {
        if(msg.sender != i_owner) {
            revert PlayList__NotTheOwner();
        }
        paused = _paused;
    }

    function addPlayList(address _user, string memory _name) public {
        if(msg.sender != i_owner) {
            revert PlayList__NotTheOwner();
        }

        if(paused) {
            revert PlayList__ContractPaused();
        }

        playlists[_user].name = _name;
    }

    function addTrack(string memory _artist, string memory _title, uint _bpm, address _user) public {
        if(paused) {
            revert PlayList__ContractPaused();
        }

        if(msg.sender != i_owner) {
            revert PlayList__NotTheOwner();
        }

        playlists[_user].tracks.push(Track(_artist, _title, _bpm));
    }
}
