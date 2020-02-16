const mETHToken = artifacts.require("mETHToken");
const mETHCrowdsale = artifacts.require("mETHCrowdsale");
// const mETHCrowdsaleDeployer = artifacts.require("mETHCrowdsaleDeployer");

contract('mETHTokensCrowdsale', ([owner, wallet, investor, otherInvestor]) => {    
    beforeEach(async function () {
        this.token = await mETHToken.new(0); 
        this.crowdsale = await mETHCrowdsale.new(RATE, wallet, this.token);
    });
    
    it("allows token purchases", async () => {
        const investmentAmount = ether(1);
        const expectedTokenAmount = RATE.mul(investmentAmount);
    
        await this.crowdsale.buyTokens(investor, { value: investmentAmount, from: investor }).should.be.fulfilled;
    
        (await this.token.balanceOf(investor)).should.be.bignumber.equal(expectedTokenAmount);
        (await this.token.totalSupply()).should.be.bignumber.equal(expectedTokenAmount);    
    });
});