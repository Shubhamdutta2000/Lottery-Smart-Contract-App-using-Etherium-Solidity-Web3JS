import Web3 from "web3";

// Take metamask web3 provider and give it to local copy of web3
// MetaMask no longer injects web3
const ethEnabled = async () => {
  if (window.ethereum) {
    try {
      window.web3 = new Web3(window.ethereum);
      // makes the popup UI request to connect your dApp to MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      return true;
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  return false;
};

if (!ethEnabled()) {
  alert("Please install MetaMask to use this dApp!");
}

export default window.web3;
