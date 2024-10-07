const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        const Token = await ethers.getContractFactory("MyToken");
        [owner, addr1] = await ethers.getSigners();
        token = await Token.deploy(ethers.utils.parseEther("1000000"));
    });

    it("Should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function () {
        await token.transfer(addr1.address, ethers.utils.parseEther("100"));
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(ethers.utils.parseEther("100"));
    });
});
