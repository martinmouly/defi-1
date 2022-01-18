/*var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var MyContract = artifacts.require("MyContract.sol");
var MyMintable = artifacts.require("IERC20Mintable.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts); 
        //await deployRecap(deployer, network, accounts); 
		await deployMyMintable(deployer,network,accounts);
		await deployMyContract(deployer,network,accounts);
		await test(deployer,network,accounts);
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

async function deployMyMintable(deployer, network, accounts){
	MyMintable=await MyMintable.new("Martin Mintable","MARTIN")
}

async function deployMyContract(deployer, network, accounts){
	MyContract=await MyContract.new(ClaimableToken.address,MyMintable.address)
}

async function test(deployer,network,accounts){
	console.log("ca submit maggle")
	await Evaluator.submitExercice(MyContract.address)
	await console.log("ok submit")
	await MyMintable.setMinter(MyContract.address,true)
	await console.log("ok set")
	await MyMintable.setMinter(Evaluator.address,false)
	await console.log("ok set 2")
	console.log(await Evaluator.ex7_createERC20())
	
}
*/
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var MyContract = artifacts.require("MyContract.sol");
var MyMintable = artifacts.require("IERC20Mintable.sol");

module.exports = async function (deployer) {
	Claimable=await ERC20Claimable.at("0xb5d82FEE98d62cb7Bc76eabAd5879fa4b29fFE94")
	Mintable = await deployer.deploy(MyMintable,"Martin Mintable","MARTIN")
  	await deployer.deploy(MyContract,Claimable.address,Mintable.address)
	Evaluator=await evaluator.at("0x384C00Ff43Ed5376F2d7ee814677a15f3e330705")
  	await Evaluator.submitExercice(MyContract.address)
	//await Evaluator.ex3_withdrawFromContract()
	//await Claimable.approve(MyContract.address,1)
	//await Evaluator.ex4_approvedExerciceSolution()
	//await Claimable.decreaseAllowance(MyContract.address,1)
	//await Evaluator.ex5_revokedExerciceSolution()
	//await Evaluator.ex6_depositTokens()
	await Mintable.setMinter(MyContract.address,true)
	await Mintable.setMinter(Evaluator.address,false)
	await Evaluator.ex7_createERC20()
};









