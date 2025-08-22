// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ZyraPresale is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public token;
    uint256 public price;
    uint256 public minPurchase;
    uint256 public maxPurchase;
    uint256 public presaleStart;
    uint256 public presaleEnd;
    uint256 public hardcap;
    uint256 public totalSold;
    bool public isFinalized;

    mapping(address => uint256) public contributions;

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event PresaleFinalized(uint256 totalSold);
    event TokensWithdrawn(address indexed buyer, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    constructor(
        address _token,
        uint256 _price,
        uint256 _minPurchase,
        uint256 _maxPurchase,
        uint256 _presaleStart,
        uint256 _presaleDuration,
        uint256 _hardcap
    ) {
        require(_token != address(0), "Invalid token address");
        require(_price > 0, "Price must be greater than 0");
        require(_minPurchase > 0, "Min purchase must be greater than 0");
        require(_maxPurchase >= _minPurchase, "Max purchase must be >= min purchase");
        require(_presaleDuration > 0, "Duration must be greater than 0");
        require(_hardcap > 0, "Hardcap must be greater than 0");

        token = IERC20(_token);
        price = _price;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        presaleStart = _presaleStart;
        presaleEnd = _presaleStart.add(_presaleDuration);
        hardcap = _hardcap;
    }

    function buyTokens() external payable nonReentrant {
        require(block.timestamp >= presaleStart, "Presale not started");
        require(block.timestamp <= presaleEnd, "Presale ended");
        require(!isFinalized, "Presale is finalized");
        require(msg.value >= minPurchase, "Below minimum purchase");
        require(msg.value <= maxPurchase, "Exceeds maximum purchase");
        
        uint256 tokenAmount = msg.value.mul(price);
        require(totalSold.add(tokenAmount) <= hardcap, "Hardcap reached");

        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        require(contributions[msg.sender] <= maxPurchase, "Exceeds max contribution");

        totalSold = totalSold.add(tokenAmount);
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");

        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }

    function finalize() external onlyOwner {
        require(block.timestamp > presaleEnd || totalSold >= hardcap, "Cannot finalize yet");
        require(!isFinalized, "Already finalized");

        isFinalized = true;
        emit PresaleFinalized(totalSold);
    }

    function withdrawFunds() external onlyOwner {
        require(isFinalized, "Not finalized");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Failed to send funds");

        emit FundsWithdrawn(owner(), balance);
    }

    function setPrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Invalid price");
        require(block.timestamp < presaleStart, "Presale already started");
        price = _newPrice;
    }

    function emergencyWithdraw() external onlyOwner {
        require(!isFinalized, "Already finalized");
        uint256 tokenBalance = token.balanceOf(address(this));
        if (tokenBalance > 0) {
            require(token.transfer(owner(), tokenBalance), "Token transfer failed");
        }
        
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            (bool sent, ) = payable(owner()).call{value: ethBalance}("");
            require(sent, "Failed to send ETH");
        }
    }
}
