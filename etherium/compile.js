import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import solc from "solc";

const __dirname = dirname(fileURLToPath(import.meta.url));

// build path in src of client path
// Reference Link: https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname

const srcClientPath = path.resolve(__dirname, '../client/src');
const buildPath = path.resolve(srcClientPath, "build");
fs.removeSync(buildPath); // remove build path completely including content inside it

// Lottery Contract path
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


// checks if build directory exists, if exists then create that directory
fs.ensureDirSync(buildPath);

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Get only Lottery contract key from compiled object
const lotteryCompile = output.contracts["Lottery.sol"]["Lottery"];


// Write out new file for contract  (i.e. Lottery ) and save the file in .json format
// and give the actual output content to each contract as 2nd param to fs.outputJSONSync
fs.outputJSONSync(
  path.resolve(buildPath, "Lottery.json"),
  lotteryCompile
);

export default lotteryCompile;
