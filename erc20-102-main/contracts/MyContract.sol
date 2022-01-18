pragma solidity >=0.4.22 <0.9.0;
import "./ERC20Claimable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IERC20Mintable.sol";
contract MyContract {

  ERC20Claimable claimableERC20;
  IERC20Mintable mintableERC20;
  mapping(address=>uint256) public custody;

  constructor(ERC20Claimable _claimableERC20, IERC20Mintable _mintableERC20) public {
    claimableERC20 = _claimableERC20;
    mintableERC20 = _mintableERC20;
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

	function depositTokens(uint256 amountToWithdraw) external returns (uint256){
    claimableERC20.transferFrom(msg.sender,address(this),amountToWithdraw);
    custody[msg.sender]+=amountToWithdraw;
  }

	function getERC20DepositAddress() external returns (address){
    return address(mintableERC20);
  }
}
