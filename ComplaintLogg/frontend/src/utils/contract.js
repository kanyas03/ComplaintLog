import { ethers } from "ethers";
import ComplaintABI from "../utils/ComplaintLog.json";

// Replace with your deployed contract address
const contractAddress = "0xC22bfe9eCD995652B16DB36FfD57Bcc80B2FAe92";

const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ FIX: await here

  const contract = new ethers.Contract(contractAddress, ComplaintABI.abi, signer);
  return contract;
};

export default getContract;
