// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    
    constructor() {
        manager = msg.sender;
    }
    
    // get all players
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    
    // add new player and give some amount of money to the Lottery contract (with msg.value)
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }

    // get big random no. from block difficulty, timestamp, players array and hash them all 
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
     }
     
     // get the random winner and transfer ether (only done by manager)
     function pickWinner() public payable restricted {
         uint index = random() % players.length;     // get the random index between 0 & players.length
         winner = players[index];
         payable(players[index]).transfer(address(this).balance);
         players = new address[](0);    // empty list of players
     }
     
     // define modifier
     modifier restricted() {
         require(msg.sender == manager);
         _;     // rest of the line of code
     }
}