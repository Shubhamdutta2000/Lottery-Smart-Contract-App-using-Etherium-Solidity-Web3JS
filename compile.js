import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import solc from "solc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Get only Inbox contract key from compiled object
const lotteryCompile = output.contracts["Lottery.sol"]["Lottery"];

export default lotteryCompile;
