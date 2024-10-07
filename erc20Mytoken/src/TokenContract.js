// src/TokenContract.js
import { ethers } from 'ethers';

// Your contract ABI
const tokenABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

const tokenAddress = "<YourTokenContractAddress>"; // Replace with your deployed contract address

export const getTokenContract = (provider) => {
    return new ethers.Contract(tokenAddress, tokenABI, provider);
};
