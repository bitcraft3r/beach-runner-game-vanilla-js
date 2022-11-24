//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RunBahamas is ERC1155 {

    string public name;
    string public symbol; 
    uint256 public tokenCount;
    string public baseUri;

    constructor(string memory _name, string memory _symbol, string memory _baseUri) ERC1155(_baseUri) {
        name = _name;
        symbol = _symbol;
        baseUri = _baseUri;
    }

    // we need to override the uri function so our nfts are compatible with opensea
    function uri(uint256 _tokenId) override public view returns(string memory) {
        uint256 mapTokenIdToFile = _tokenId % 5;
        if (mapTokenIdToFile == 0) mapTokenIdToFile = 5;
        return string (
            abi.encodePacked(
                baseUri,
                Strings.toString(mapTokenIdToFile),
                ".json"
            )
        );
    }

    function mint(uint256 amount) public {
        tokenCount += 1;
        _mint(msg.sender, tokenCount, amount, "");
    }
}