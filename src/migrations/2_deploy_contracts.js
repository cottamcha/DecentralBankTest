const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD")
const DecentralBank = artifacts.require("DecentralBank")

module.exports = async function(deployer, network, accounts){
    //DEPLOY MOCK TETHER CONTRACT
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()

    //DEPLOY RWD CONTRACT
    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()

    //DEPLOY DECENTRAL BANK CONTRACT
    await deployer.deploy(DecentralBank, rwd.address, tether.address)
    const decentralBank = await DecentralBank.deployed()

    //TRANSER ALL RWD TO DECENTRAL BANK
    await rwd.transfer(decentralBank.address, '1000000000000000000000000')
    
    //DISTRIBUTE 100 TETHER TO INVESTORS
    await tether.transfer(accounts[1], '100000000000000000000')
}