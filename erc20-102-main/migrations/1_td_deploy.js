/*var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var MyContract = artifacts.require("MyContract.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts); 
        //await deployRecap(deployer, network, accounts); 
		await deployMyContract(deployer,network,accounts);
		//await test(deployer,network,accounts);
    });
};


async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
	ClaimableToken = await ERC20Claimable.new("ClaimableToken","CLTK",web3.utils.toBN("20000000000000000000000000000"))
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, ClaimableToken.address)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("ClaimableToken " + ClaimableToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function deployMyContract(deployer, network, accounts){
	MyContract=await MyContract.new(ClaimableToken.address)
}

async function test(deployer,network,accounts){
	await Evaluator.submitExercice(MyContract.address)
	console.log(await Evaluator.ex4_withdrawFromContract())
	
}*/
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var MyContract = artifacts.require("MyContract.sol");

module.exports = async function (deployer) {
	Claimable=await ERC20Claimable.at("0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94")
  	await deployer.deploy(MyContract,Claimable.address);
	Evaluator=await evaluator.at("0x384C00Ff43Ed5376F2d7ee814677a15f3e330705")
  	await Evaluator.submitExercice(MyContract.address)
	await Evaluator.ex2_claimedFromContract()
	await Evaluator.ex3_withdrawFromContract()
};









