import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract", function () {
  let Voting: any;
  let voting: any;
  let owner: any;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("deve permitir adicionar candidatos", async function () {
    await voting.addCandidate("Alice");
    const [name, voteCount] = await voting.getCandidate(0);
    expect(name).to.equal("Alice");
    expect(voteCount).to.equal(0);
  });

  it("deve permitir votar em candidatos", async function () {
    await voting.addCandidate("Alice");
    await voting.vote(0);
    const [, voteCount] = await voting.getCandidate(0);
    expect(voteCount).to.equal(1);
  });

  it("não deve permitir votar mais de uma vez", async function () {
    await voting.addCandidate("Alice");
    await voting.vote(0);
    await expect(voting.vote(0)).to.be.revertedWith("Você já votou");
  });
});
