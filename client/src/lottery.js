import web3 from "./web3";
import lotteryCompiled from "./build/Lottery.json"

// Use contract's abi and address to create local contract instance using web3 library

const contractAddress = "0x144d71b84b873b0B1f203ceadbb41C09a575867A";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
    signature: "constructor",
  },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xe97dcb62",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x8b5b9ccc",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x481c6a75",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0x5d495aea",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "players",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xf71d96cb",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xdfbf53ae",
  },
];

// - exports complete copy of our deployed lottery contract which we are work with react
// - We are going to interact with deployed contract
export default new web3.eth.Contract(lotteryCompiled.abi, contractAddress);
