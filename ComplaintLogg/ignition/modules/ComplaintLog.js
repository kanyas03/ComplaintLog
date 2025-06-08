//import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ComplaintLogModule = buildModule("ComplaintLogModule", (m) => {
  const complaintLog = m.contract("ComplaintLog");
  return { complaintLog };
});

module.exports = ComplaintLogModule;
