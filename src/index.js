const XRPLService = require("./services/xrplService");
const GrantService = require("./services/grantService");
const DonationService = require("./services/donationService");
const config = require("../config");

async function main() {
  const xrplService = new XRPLService(config.xrplServerUrl);
  await xrplService.connect();

  const grantService = new GrantService(xrplService);
  const donationService = new DonationService(xrplService);

  // 예시: 그랜트 생성
  const newGrant = await grantService.createGrant(
    "Example Grant",
    "This is a test grant"
  );
  console.log("New grant created:", newGrant);

  // 예시: 그랜트에 후원
  const donation = await donationService.donateToGrant(newGrant.id, 100); // 100 XRP 후원
  console.log("Donation made:", donation);

  // 연결 종료
  await xrplService.disconnect();
}

main().catch(console.error);
