const express = require("express");
const XRPLService = require("./services/xrplService");
const GrantService = require("./services/grantService");
const DonationService = require("./services/donationService");
const config = require("../config");
const app = express();

const wallet = xrpl.Wallet.fromSeed("sEd7tfZb4FYzQiJGTop84xLWdVkQPSy");

app.post("/createGrant", (req, res) => {
  const title = "title";
  const description = "description";
  // grant 생성
  const newGrant = GrantService.createGrant(title, description);
  // AccountSet Tx 만들고 submit
  XRPLService.AccountSetTx(wallet, newGrant);
});

app.post("/cancel", (req, res) => {
  const grantId = Math.random().toString(36).substring(2, 12);
  // DB에서 grantId인 grant.model 객체를 가지고 오기
  /*
   */
  let grant;
  if (grant.getStatus() == "Pending") {
    grant = GrantService.cancelGrant(grant);
  } else {
    // 에러발생
  }

  if (grant != null) {
    // AccountSet Tx 만들고 submit
    XRPLService.AccountSetTx(wallet, grant);
  }
});

app.post("/donateGrant", (req, res) => {
  const grantId = Math.random().toString(36).substring(2, 12);
  let amount;

  // DB에 조회를 해서 grantId에 해당하는 grant가 있는지 확인해야함
  let grant;

  if (grant == null) {
    // 에러 처리
  }

  if (Date.now >= grant.getGrantStart() && grant.getStatus() == "Active") {
    // grant 업데이트
    grant = GrantService.donateGrant(grant, amount);

    //트랜잭션 생성
    const tx = XRPLService.EscrowCreate(wallet, grant, amount);

    const sequence = tx.result.Sequence;
    // dnation 생성
    const donation = DonationService.createDonation(
      grantId,
      amount,
      wallet,
      sequence
    );
  }
});

app.post("/distributeFunding", (req, res) => {
  // DB에서 모든 GrantInfo 데이터들을 가지고 온다
  /**
  
   */
  let grants;
  // grantId들을 리스트로 만들어서 반환
  const grantIds = GrantService.getGrantIdList(grants);

  // grantId : 퍼센트(실수형으로 저장 되어 있음)
  const fundingRate =
    QuadraticFundingService.calculateDistributionRate(grantIds);
  let totalMatchingPoolAmount;
  grants = QuadraticFundingService.distributeFunding(
    totalMatchingPoolAmount,
    fundingRate,
    grants
  );

  // 관리자가 각 그랜트의 제안자에게 자금을 배분하는 트랜잭션
  // 모든 그랜트에게 자금을 분배해야하기 때문에 반복문 사용
  for (const a of grant) {
    XRPLService.PaymentTx(wallet, a);
  }

  // Escrow에 잠긴 사용자가 기부한 금액을 EscrowFinsih 트랜잭션을 통해 grant 제안자에게 전달하기
  // EscrowFinish 트랜잭션을 생성해야 함
  // 사용자가 기부할 때 EscrowCreate 트랜잭션을 만들었으므로 그 수만큼 EscrowFinish 트랜잭션을 만들어야 함
  // DB에서 DonationInfo의 데이터를 모두 가지고 오기
  let donations;
  for (const a of donations) {
    XRPLService.EscrowFinish(a);
  }

  // 모든 과정이 완료되었으므로 AccountSet 트랜잭션을 만들어서 보내기.
  for (const a of grants) {
    XRPLService.AccountSetTx(wallet, a);
  }

  // GrantInfo distributed로 상태 변경하기
  GrantService.distributeFunding(grants);
});

app.listen(3000);
