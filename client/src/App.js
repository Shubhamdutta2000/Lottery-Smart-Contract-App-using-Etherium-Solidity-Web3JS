import React, { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [currentBalance, setCurrentBalance] = useState("");
  const [value, setValue] = useState("");
  const [enterMessage, setEnterMessage] = useState("");
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const contractCall = async () => {
      // get all accounts in metamask
      const accounts = await web3.eth.getAccounts();

      if (accounts[0]) {
        // get manager, players and balance in contract (in wei)
        const fetchedManager = await lottery.methods.manager().call();
        const fetchedPlayers = await lottery.methods.getPlayers().call();
        const contractBalance = await web3.eth.getBalance(
          lottery.options.address
        );
        setManager(fetchedManager);
        setPlayers(fetchedPlayers);
        setCurrentBalance(web3.utils.fromWei(contractBalance, "ether")); // convert balance from wei to ether
      }
    };
    contractCall();
  }, [players, currentBalance]);

  // enter player to the Lottery
  const enterHandler = async (e) => {
    e.preventDefault();

    try {
      // list all acounts from metamask
      const accounts = await web3.eth.getAccounts();

      setEnterMessage("Waiting for transaction...");
      // enter player to the lottery with some amount of ether
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value),
      });

      setEnterMessage("You have entered!!");
    } catch (error) {
      alert(error.message);
      setEnterMessage("");
    }
  };

  // Pick a Winner (by only manager)
  const pickWinnerHandler = async () => {
    try {
      // list all acounts from metamask
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);

      setMessage("Waiting for transaction success...");

      // pick a winner by manager
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
      setMessage("A winner has been picked!!");

      // get the winner
      const fetchedWinner = await lottery.methods.winner().call();
      setWinner(fetchedWinner);
    } catch (error) {
      alert(error.message);
      setMessage("");
    }
  };

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>
        There are currently {players.length} players entered, competing to win{" "}
        {currentBalance} ether!
      </p>

      <h2>All Players</h2>

      {players.map((player, index) => (
        <h4>{index + 1}: {player}</h4>
      ))}

      <hr />

      {/* Enter Form */}
      <form onSubmit={enterHandler}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input onChange={(e) => setValue(e.target.value)} />
        </div>
        <button type="submit">Enter</button>
      </form>
      <h3>{enterMessage}</h3>


      <hr />

      {/* Pick Winner */}
      <h4>Ready to pick a Winner?</h4>
      <button onClick={pickWinnerHandler}>Pick a Winner!</button>
      <hr />
      <h4>{message}</h4>

      {/* Winner */}
      {winner && <h4>{winner} is the winner</h4>}
    </div>
  );
}

export default App;
