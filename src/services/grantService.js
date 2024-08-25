// 그랜트를 생성하는 클래스
const xrpl = require("xrpl");
const Grant = require("../models/Grant");
const createGrantTransaction = require("../utils/xrplHelpers");
const config = require("../../config");
class grantService {
  constructor(xrplService) {
    this.xrplService = xrplService;
  }

  async createGrant(title, description) {
    const wallet = xrpl.Wallet.fromSeed(config.testWalletSeed); // Test secret; don't use for real
    // 10자리 랜덤
    const grantId = Math.random().toString(36).substring(2, 12);
    const owner = wallet.address;
    // 그랜트 객체 생성
    const grant = new Grant(grantId, owner, title, description);

    // Transaction 생성
    const tx = createGrantTransaction(owner, title);

    const result = await this.xrplService.submitTransaction(tx, wallet);
    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return grant;
    } else {
      throw new Error("Failed to create grant");
    }
  }
}

module.exports = grantService;
