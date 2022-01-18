pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20Mintable is IERC20 
{
	mapping(address=>bool) public minter;

	constructor() public {

	}

	function setMinter(address minterAddress, bool isMinter)  external{
		minter[minterAddress].isMinter=isMinter;
	}

	function mint(address toAddress, uint256 amount)  external{
		require(minter[minterAddress].isMinter);
		_mint(toAddress,amount);
	}

	function isMinter(address minterAddress) external returns (bool){
		return minter[minterAddress].isMinter;
	}
}
