pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IERC20Mintable is ERC20 
{
	mapping(address=>bool) public minter;

	constructor(string memory name, string memory symbol) public ERC20(name, symbol) 
	{
	   _mint(msg.sender, 1000000);
	}

	function setMinter(address minterAddress, bool isMinter)  external{
		minter[minterAddress]=isMinter;
	}

	function mint(address toAddress, uint256 amount)  external{
		require(minter[toAddress],"must be set to minter");
		_mint(toAddress,amount);
	}

	function burn(address toAddress, uint256 amount)  external{
		_burn(toAddress,amount);
	}

	function isMinter(address minterAddress) external returns (bool){
		return minter[minterAddress];
	}
}
