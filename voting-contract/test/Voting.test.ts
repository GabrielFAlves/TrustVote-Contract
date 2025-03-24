import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting Contract - Testes completos", function () {
  let Voting: any;
  let voting: any;
  let backendSigner: any;
  let deployer: any;
  let user: any;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();

    // Cria carteira simulada para backendSigner
    backendSigner = ethers.Wallet.createRandom().connect(ethers.provider);

    // Envia ETH para ela (necessário para testes que usem transações)
    await deployer.sendTransaction({
      to: backendSigner.address,
      value: ethers.parseEther("1.0"),
    });

    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(backendSigner.address);
    await voting.waitForDeployment();
  });

  async function signCandidate(name: string) {
    const hash = ethers.keccak256(ethers.toUtf8Bytes(name));
    return await backendSigner.signMessage(ethers.getBytes(hash));
  }

  async function signVote(address: string) {
    const hash = ethers.solidityPackedKeccak256(["address"], [address]);
    return await backendSigner.signMessage(ethers.getBytes(hash));
  }

  it("deve permitir adicionar um candidato com assinatura valida", async () => {
    const sig = await signCandidate("Alice");
    await voting.addCandidate("Alice", sig);
    const [name, voteCount] = await voting.getCandidate(0);
    expect(name).to.equal("Alice");
    expect(voteCount).to.equal(0);
  });

  it("deve falhar ao adicionar candidato com nome vazio", async () => {
    const sig = await signCandidate("");
    await expect(voting.addCandidate("", sig)).to.be.revertedWith("Nome do candidato nao pode ser vazio");
  });

  it("deve falhar ao adicionar candidato com assinatura invalida", async () => {
    const fakeWallet = ethers.Wallet.createRandom();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("Bob"));
    const fakeSig = await fakeWallet.signMessage(ethers.getBytes(hash));
    await expect(voting.addCandidate("Bob", fakeSig)).to.be.revertedWith("Assinatura invalida!");
  });

  it("deve permitir votar com assinatura valida", async () => {
    const sig = await signCandidate("Alice");
    await voting.addCandidate("Alice", sig);

    const voteSig = await signVote(deployer.address);
    await voting.vote(0, voteSig);
    const [, voteCount] = await voting.getCandidate(0);
    expect(voteCount).to.equal(1);
  });

  it("deve falhar ao votar com assinatura invalida", async () => {
    const sig = await signCandidate("Alice");
    await voting.addCandidate("Alice", sig);

    const fakeWallet = ethers.Wallet.createRandom();
    const hash = ethers.solidityPackedKeccak256(["address"], [deployer.address]);
    const fakeSig = await fakeWallet.signMessage(ethers.getBytes(hash));

    await expect(voting.vote(0, fakeSig)).to.be.revertedWith("Assinatura invalida!");
  });

  it("deve falhar ao votar duas vezes com mesma conta", async () => {
    const sig = await signCandidate("Alice");
    await voting.addCandidate("Alice", sig);

    const voteSig = await signVote(deployer.address);
    await voting.vote(0, voteSig);

    await expect(voting.vote(0, voteSig)).to.be.revertedWith("Voce ja votou");
  });

  it("deve falhar ao votar em candidato inexistente", async () => {
    const voteSig = await signVote(deployer.address);
    await expect(voting.vote(99, voteSig)).to.be.revertedWith("Candidato invalido");
  });

  it("deve listar todos os candidatos corretamente", async () => {
    const sig1 = await signCandidate("Alice");
    const sig2 = await signCandidate("Bob");
    await voting.addCandidate("Alice", sig1);
    await voting.addCandidate("Bob", sig2);

    const candidates = await voting.getAllCandidates();
    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("Alice");
    expect(candidates[1].name).to.equal("Bob");
  });

  it("deve emitir evento ao adicionar candidato", async () => {
    const sig = await signCandidate("Carlos");
    await expect(voting.addCandidate("Carlos", sig))
      .to.emit(voting, "CandidateAdded")
      .withArgs(0, "Carlos");
  });

  it("deve emitir evento ao votar", async () => {
    const sig = await signCandidate("Alice");
    await voting.addCandidate("Alice", sig);
    const voteSig = await signVote(deployer.address);
    await expect(voting.vote(0, voteSig))
      .to.emit(voting, "Voted")
      .withArgs(deployer.address, 0, "Alice");
  });
});

