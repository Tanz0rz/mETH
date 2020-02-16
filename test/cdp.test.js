const Maker = require('@makerdao/dai');
const { default: McdPlugin, ETH, MDAI } = require('@makerdao/dai-plugin-mcd');

const CDP = artifacts.require("CDP");

contract('cdp', (accounts) => {
    it("should assert true", async () => {
        const maker = await Maker.create('test', {
            plugins: [
                [McdPlugin, {}]
            ]
        });
        await maker.authenticate();

        // const balance = await maker
        //     .service('token')
        //     .getToken('ETH')
        //     .balance();
        // console.log('Account: ', maker.currentAddress());
        // console.log('Balance', balance.toString());

        // const cdp = await maker
        //     .service('mcd:cdpManager')
        //     .openLockAndDraw('ETH-A', ETH(1), MDAI(20));

        // console.log('Opened CDP #'+cdp.id);
        // console.log('Collateral amount:'+cdp.collateralAmount.toString());
        // console.log('Debt Value:'+cdp.debtValue.toString());

        const cdp = await CDP.deployed();
        await cdp.open();

        // const cdpInfo = await maker
        //     .service('mcd:cdpManager')
        //     .getInfo(cdp.cdpId);

        // console.info("!!!!!!!!", cdpInfo);
    });
});