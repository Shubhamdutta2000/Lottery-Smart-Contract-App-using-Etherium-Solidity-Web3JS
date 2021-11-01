# Lottery-Smart-Contract-App-using-Etherium-Solidity-Web3JS

> User have to enter to the contract and wait for the manager to pick the winner wwith all test cases

## How to use

    - User have to install Metamask browser extension and add some test coin in thei Rinbey test network
    - Then connect the site with Metamask and then refresh the page
    - Then User have to give some amount of ether to enter to the lottery contract for trying their luck
    - Wait for the manager to pick the winner

## How to run Locally

- Add you own mnemonicPhrase to .env file of etherium folder
- Then run these command to start the application

```
    # Compile Contract
    npm run compile

    # Deploy Contract
    npm run deploy

    # Start client server
    cd client
    npm start
```

- Add Deployed Contract Address (get address from console after deploying the contract) to the .env of src folder in client folder

## Tech Stack

- ### For server-side

  - Solidity Programming Language
  - Web3 library for testing purpose
  - hdwallet-provider
  - Ganache-CLI

- ### For client-side
  - React
  - Web3 library
  - Metamask

## Demo

https://lottery-contract.netlify.app/
