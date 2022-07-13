const { inputToConfig } = require("@ethereum-waffle/compiler")
const { expect } = require("chai")
const { ethers, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT", async function () {
          let basicNFT, deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0]

              await deployments.fixture(["basicnft"])
              basicNFT = await ethers.getContract("BasicNFT")
          })

          it("Allows users to mint and NFT, and updates accordingly", async function () {
              const txResponse = await basicNFT.mintNFT()
              await txResponse.wait(1)

              const tokenURI = await basicNFT.tokenURI(0)
              const tokenCounter = await basicNFT.getTokenCounter()

              expect(tokenCounter.toString()).to.equal("1")
              expect(tokenURI).to.equal(await basicNFT.TOKEN_URI())
          })
      })
