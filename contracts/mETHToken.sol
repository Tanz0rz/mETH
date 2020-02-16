pragma solidity ^0.5.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract mETHToken is ERC20, ERC20Detailed, ERC20Mintable {
    constructor(uint256 initialSupply)
        ERC20Detailed("moonETH", "mETH", 18)
        public
    {
        _mint(msg.sender, initialSupply);
    }
}

contract mETHCrowdsale is Crowdsale, MintedCrowdsale {
    // Naive CDP/Vault simulation
    uint256 public collateralAmount;

    uint256 public tokenRatio;

    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        MintedCrowdsale()
        Crowdsale(rate, wallet, token)
        public
    {
        collateralAmount = token.totalSupply();
        tokenRatio = 100;
    }

    // Simulate process change increasing amount of stored wei after rebalance.
    function addCollateral(uint256 amount) public {
        collateralAmount += amount;
        tokenRatio = 100 * token().totalSupply() / collateralAmount;
    }

    // Override this method to have a way to add business logic to your crowdsale when buying
    // Returns weiAmount times rate by default
    function _getTokenAmount(uint256 weiAmount) internal view returns(uint256) {
        return super._getTokenAmount(weiAmount) * tokenRatio / 100;
    }

    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
        addCollateral(weiAmount);

        return super._updatePurchasingState(beneficiary, weiAmount);
    }
}

contract mETHCrowdsaleDeployer {
    ERC20Mintable public token;
    Crowdsale public crowdsale;

    constructor()
        public
    {
        token = new mETHToken(100);

        crowdsale = new mETHCrowdsale(
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