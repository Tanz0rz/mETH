const Maker = require('@makerdao/dai');

const CDP = artifacts.require("CDP");

contract('cdp', (accounts) => {
    it("should assert true", async () => {
        const maker = await Maker.create('test');
        await maker.authenticate();

        const cdpInst = await maker.openCdp();
        const info = await cdpInst.getInfo();
        console.log(info);

        const cdp = await CDP.deployed();
        await cdp.deposit(2);
        await cdp.deposit(5);
        const bal = (await cdp.getBalance()).toNumber();
        assert.equal(bal, 7, 'WRONG');
    });
});