pragma solidity ^0.5.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract mETHToken is ERC20, ERC20Detailed, ERC20Mintable {
    constructor()
        ERC20Detailed("moonETH", "mETH", 18)
        public
    {

    }
}

contract mETHCrowdsale is Crowdsale, MintedCrowdsale {
    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        MintableCrowdsale()
        Crowdsale(rate, wallet, token)
        public
    {

    }

    // Override this method to have a way to add business logic to your crowdsale when buying
    // Returns weiAmount times rate by default
    function _getTokenAmount(uint256 weiAmount) internal view returns(uint256) {
        return super._getTokenAmount(weiAmount);
    }
}

contract mETHCrowdsaleDeployer {
    constructor()
        public
    {
        ERC20Mintable token = new mETHToken();

        Crowdsale crowdsale = new mETHCrowdsale(
            1,
            msg.sender, // send Ether to the deployer. TODO Send to CDP contract
            token
        );

        // transfer the minter role from this contract (the default)
        // to the crowdsale, so it can mint tokens
        token.addMinter(address(crowdsale));
        token.renounceMinter();
    }
}