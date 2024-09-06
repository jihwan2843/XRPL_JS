const xrpl = require("xrpl");
const config = require("../../config");
const XRPHelpers = require("../utils/xrplHelpers");
// XRPL 관련 상호작용을 하는 클래스
class XRPLService {
  constructor() {
    this.client = new xrpl.Client(config.xrplTestServerUrl);
  }

  async connect() {
    await this.client.connect();
  }

  async AccountSetTx(wallet, grant) {
    // Transaction 생성
    const tx = XRPHelpers.AccountSetTx(wallet.address, grant);
    const result = await this.xrplService.submitTransaction(tx, wallet);
    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return result;
    } else {
      throw new Error("Failed to create grant");
    }
  }

  async EscrowCreate(wallet, grant, amount) {
    // Transaction 생성
    const tx = XRPHelpers.EscrowCreateTx(wallet, amount, grant);
    const result = await this.xrplService.submitTransaction(tx, wallet);
    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return result;
    } else {
      throw new Error("Failed to create grant");
    }
  }

  async PaymentTx(wallet, a) {
    // Transaction 생성
    const tx = XRPHelpers.PaymentTx(wallet, grant, amount);
    const result = await this.xrplService.submitTransaction(tx, wallet);
    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return result;
    } else {
      throw new Error("Failed to create grant");
    }
  }

  async EscrowFinish(wallet, donation) {
    // Transaction 생성
    const tx = XRPHelpers.EscrowFinishTx(wallet, donation);
    const result = await this.xrplService.submitTransaction(tx, wallet);
    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      return result;
    } else {
      throw new Error("Failed to create grant");
    }
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async submitTransaction(transaction, wallet) {
    const prepared = await this.client.autofill(transaction);
    const signed = wallet.sign(prepared);
    const result = await this.client.submitAndWait(signed.tx_blob);
    return result;
  }
}

module.exports = XRPLService;
