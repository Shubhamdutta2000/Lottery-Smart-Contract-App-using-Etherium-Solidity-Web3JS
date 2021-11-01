import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import lotteryCompile from "./build/Lottery.json";
import dotenv from "dotenv";
dotenv.config();

const mnemonicPhrase = process.env.mnemonicPhrase;

// By default, the HDWalletProvider will use the address of the first address that's generated from the mnemonic
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  // get from infura api
  providerOrUrl:
    "https://rinkeby.infura.io/v3/195ff528807b4c438b0b1c97f8156886",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const abi = lotteryCompile.abi;
  const bytecode = lotteryCompile.evm.bytecode.object;

  // data: It is the compiled version of the contract
  // arguments: assign some initial value to the new instance of Inbox contract
  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
};

deploy();
