// var CDP = artifacts.require("CDP");
// var mETHToken = artifacts.require("mETHToken");
// var mETHCrowdsale = artifacts.require("mETHCrowdsale");
var mETHCrowdsaleDeployer = artifacts.require("mETHCrowdsaleDeployer");

module.exports = function(deployer) {
    // deployer.deploy(CDP);
    // deployer.deploy(mETHToken);
    // deployer.deploy(mETHCrowdsale);
    deployer.deploy(mETHCrowdsaleDeployer);
};