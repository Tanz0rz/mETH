pragma solidity ^0.5.1;

contract CDP {
  address public owner;
  // TODO This may not be a address
  address cupAddress;
  uint balance;

  constructor() public {
    owner = msg.sender;
    // create cdp

    balance = 0;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function deposit(uint amount) public {
    balance += amount;
    // wrap eth (gem)
    // add to cup
    // get dai
    // convert to eth
    // wrap
    // add to cup
    // repeat until exposure is 2x
  }

  function getBalance() public view returns (uint) {
    return balance;
  }

/**

  function widthdraw() public restricted {
    // TODO reverse of deposit
  }

  function rebalance() public restricted {
    // TODO Change margin leverage
  }

*/
}
