pragma solidity 0.6.1;

import "./PointOfSale.sol";
import "./KyC.sol";

contract AssetSale is Crowdsale {

    KyC kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KyC _kyc

    )
        Crowdsale(rate, wallet, token)
        public
    {
    	
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kyc.KyCCompleted(msg.sender), "KYC not completed.");
    }
}