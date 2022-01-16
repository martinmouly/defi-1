// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./ERC20Claimable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyContract {

  ERC20Claimable claimableERC20;
  mapping(address=>uint256) public custody;

  constructor(ERC20Claimable _claimableERC20) public {
    claimableERC20 = _claimableERC20;
  }

  function claimTokensOnBehalf() external{
    claimableERC20.claimTokens();
    custody[msg.sender]+=claimableERC20.distributedAmount();
  }


	function tokensInCustody(address callerAddress) external returns (uint256){
    return custody[callerAddress];
  }

	function withdrawTokens(uint256 amountToWithdraw) external returns (uint256){
    claimableERC20.transfer(msg.sender,amountToWithdraw);
    custody[msg.sender]-=amountToWithdraw;
  }

	//function depositTokens(uint256 amountToWithdraw) external returns (uint256); 

	//function getERC20DepositAddress() external returns (address);
}
