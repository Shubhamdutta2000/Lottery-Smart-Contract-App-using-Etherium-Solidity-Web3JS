// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {
    string[] public myArray;
    
    constructor() {
       myArray.push("HI");
    }
    
    function getMyArray() public view returns (string[] memory) {
        return myArray;
    }
    
    function getArrayLength() public view returns (uint) {
        return myArray.length;
    }
    
    function getFirstElement() public view returns (string memory) {
        return myArray[0];
    }
}