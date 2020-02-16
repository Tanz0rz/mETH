const mETHToken = artifacts.require("mETHToken");
const mETHCrowdsale = artifacts.require("mETHCrowdsale");
const mETHCrowdsaleDeployer = artifacts.require("mETHCrowdsaleDeployer");

contract('mETHTokensCrowdsale', ([owner, wallet, investor, otherInvestor]) => {    
    beforeEach(async function () {
        this.deployer = await mETHCrowdsaleDeployer.deployed();
        this.token = await mETHToken.at(await this.deployer.token());
        this.crowdsale = await mETHCrowdsale.at(await this.deployer.crowdsale());
    });
    
    it("allows token purchases with less generated with larger pool", async function () {
        const investmentWei = 100;
        const growthWei = 100;

        const getTotalSupply = async () => {
            const totalSupplyRes = await this.token.totalSupply();
            return totalSupplyRes.toNumber();
        };

        const getInvestorBalance = async (investor) => {
            const investorBalanceRes = await this.token.balanceOf(investor);
            return investorBalanceRes.toNumber();
        };

        const divider = '------------------------------------------------------';
        console.log();
        console.log(divider);
        console.log();

        const startingSupply = await getTotalSupply();
        console.log(`Starting token supply (wei):`, startingSupply);
        assert.equal(startingSupply, 100);
    
        console.log(`Investor sends 100 wei, get 100 tokens (wei)`);
        await this.crowdsale.buyTokens(investor, { value: investmentWei, from: investor });
    
        assert.equal(await getInvestorBalance(investor), 100);
        assert.equal(await getTotalSupply(), 200);


        console.log(`ETH CDP Collateral grows by ${growthWei} wei`);
        await this.crowdsale.addCollateral(growthWei);

        console.log(`Another Investor sends 100 wei, get 66 tokens (wei) due to CDP collateral growth`);
        await this.crowdsale.buyTokens(otherInvestor, { value: investmentWei, from: otherInvestor });
    
        assert.equal(await getInvestorBalance(otherInvestor), 66);
        assert.equal(await getTotalSupply(), 266);

        console.log();
        console.log(divider);
        console.log();
    });
});