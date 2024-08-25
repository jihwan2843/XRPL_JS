const xrpl = require("xrpl");
const config = require("../../config");
// XRPL 관련 상호작용을 하는 클래스
class XRPLService {
  constructor() {
    this.client = new xrpl.Client(config.xrplTestServerUrl);
  }

  async connect() {
    await this.client.connect();
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
