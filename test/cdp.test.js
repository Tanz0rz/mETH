const CDP = artifacts.require("CDP");

contract('cdp', (accounts) => {
    it("should assert true", async () => {
        const cdp = await CDP.deployed();
        const res = await cdp.deposit();
        assert.equal(res.toNumber(), 1337, 'WRONG');
    });
});