pragma solidity ^0.6.1;

contract CDP {
  address public owner;
  // TODO This may not be a address
  address cupAddress;

  constructor() public {
    owner = msg.sender;
    // create cdp
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function deposit() public restricted {

    // wrap eth (gem)
    // add to cup
    // get dai
    // convert to eth
    // wrap
    // add to cup
    // repeat until exposure is 2x
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
