pragma solidity 0.6.1;

import "./PointOfSale.sol";

contract AssetSale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
        public
    {

    }
}