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
    const wallet = await xrpl.Wallet.fromSeed(config.testWalletSeed); // Test secret; don't use for real
    // 10자리 랜덤
    const grantId = Math.random().toString(36).substring(2, 12);
    const owner = wallet.address;
    // 그랜트 객체 생성
    const grant = new Grant(grantId, owner, title, description);
    // newGrant를 DB에 저장하는 기능 필요
    /*
     */
    return grant;
  }

  cancelGrant(grant) {
    grant.setStatus("Canceled");
    // update된 grant를 DB에 저장하기
    /*
     */
    return grant;
  }
  donateGrant(grant, amount) {
    const currentAmount = grant.getTotalDonationAmount();
    grant.setTotalDonationAmount(currentAmount + amount);
    grant.setStatus();
    // update된 grant를 DB에 저장하기.
    /*
     */
    return grant;
  }

  getGrantIdList(grants) {
    const grantIds = [];

    for (const grant of grants) {
      // Grant의 상태가 'COMPLETED'일 때 자금을 분배 가능
      if (grant.getStatus() === "COMPLETED") {
        grantIds.push(grant.getGrantId());
      } else {
        // 상태가 'COMPLETED'가 아닐 경우 에러 발생
        throw new Error(
          `Grant with ID ${grant.getGrantId()} is not in COMPLETED status. Status: ${grant.getStatus()}`
        );
      }
    }
    return grantIds;
  }

  distributeFunding(grants) {
    for (const a of grants) {
      a.setGrantStatus("distributed");
    }
    // grant를 DB에 저장
  }
}

module.exports = grantService;
