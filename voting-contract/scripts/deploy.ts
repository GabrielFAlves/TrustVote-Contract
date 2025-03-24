import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contract with the account:", deployer.address);

  const backendSigner = process.env.BACKEND_SIGNER!;
  if (!backendSigner) {
    throw new Error("❌ Variável BACKEND_SIGNER não definida no .env");
  }

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(backendSigner);

  await voting.waitForDeployment();
  const contractAddress = await voting.getAddress();
  console.log("✅ Voting contract deployed to:", contractAddress);

  console.log("🔹 Verifique no Polygonscan:", `https://amoy.polygonscan.com/address/${contractAddress}`);
}

main().catch((error) => {
  console.error("❌ Deploy failed:", error);
  process.exitCode = 1;
});
