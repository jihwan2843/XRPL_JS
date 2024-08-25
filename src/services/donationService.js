const xrpl = require("xrpl");
const config = require("../../config");

class DonationService {
  constructor(xrplService) {
    this.xrplService = xrplService;
  }

  async donateToGrant(grantId, amount) {
    const wallet = await xrpl.Wallet.fromSeed(config.testWalletSeed);
  }
}
