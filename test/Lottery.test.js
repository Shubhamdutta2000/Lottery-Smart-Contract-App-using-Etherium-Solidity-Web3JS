import ganache from "ganache-cli";
import Web3 from "web3";
import lotteryCompile from "../compile.js";

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

/////////////////////////////////////////////////////////////

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // Use one of those accounts to deploy the contract
  const abi = lotteryCompile.abi;
  const bytecode = lotteryCompile.evm.bytecode.object;

  // data: It is the compiled version of the contract
  // arguments: assign some initial value to the new instance of Inbox contract
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

/////////////////////////////////////////////////////////

describe("Lottery Test cases", () => {
  // check the address of deployed contract
  test("deploys a contract", () => {
    expect(lottery.options.address).toBeTruthy();
  });

  /////////////////////////////////////////////////////////

  // check if the 1st account with the 1st player's address
  test("allows one account to enter", async () => {
    // add one player
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    // get all players
    const players = await lottery.methods.getPlayers().call();

    // check if 1st accounts address is equal to 1st players address or not
    expect(players[0]).toEqual(accounts[0]);
    expect(players.length).toEqual(1);
  });

  /////////////////////////////////////////////////////////

  // check if the multiple account with the multiple player's address
  test("allows multiple accounts to enter", async () => {
    // add one player
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    // add 2nd player
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });

    // add 3rd player
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });

    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    console.log(contractBalance);
    // get all players
    const players = await lottery.methods.getPlayers().call();

    // check if each players address is equal to their corresponding accounts address or not
    expect(players[0]).toEqual(accounts[0]);
    expect(players[1]).toEqual(accounts[1]);
    expect(players[2]).toEqual(accounts[2]);
    expect(players.length).toEqual(3);
  }, 10000);

  /////////////////////////////////////////////////////////

  // checks if minimum value (amount of ether) requires to enter any player is valid or not
  test("requires a minimum amount of ether", async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[1],
        value: 0,
      });
      expect(false);
    } catch (error) {
      expect(error);
    }
  });

  /////////////////////////////////////////////////////////

  // players without manager cannot pick winner
  test("only manager can call pickWinner", async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      expect(false);
    } catch (error) {
      expect(error);
    }
  });

  /////////////////////////////////////////////////////////

  // end to end test
  test("sends money to the winner player, resets the players array and check if contract balance is empty or not after picking winner and check the winner", async () => {
    // add player
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });

    // get initial balance of player 1 before getting the winner
    const initialBalance = await web3.eth.getBalance(accounts[0]);

    // pick winner
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    // get final balance after getting the winner
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    // check if finalBalance is more then initialBalance
    // expect(Number(finalBalance)).toBeGreaterThan(Number(initialBalance));

    // checks if difference is more then 1.8 ether
    const difference = finalBalance - initialBalance;
    expect(difference > web3.utils.toWei("1.8", "ether"));

    // checks if players array resets
    const players = await lottery.methods.getPlayers().call();
    expect(players == []);

    // check if lottery contract balance is empty or not
    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    console.log(contractBalance);
    expect(contractBalance == 0);

    // check the winner
    const winner = await lottery.methods.winner().call();
    console.log(winner);
    expect(winner).toEqual(accounts[0]);
  });
});
