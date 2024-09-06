const Donation = require("../models/Donation");

class DonationService {
  constructor(xrplService) {
    this.xrplService = xrplService;
  }

  createDonation(grantId, amount, wallet, sequence) {
    const donation = new Donation(
      grantId,
      wallet.address,
      amount,
      Date.now(),
      sequence
    );
    // update된 donation를 DB에 저장하기. sequence도 donation에 저장해야함
    /*
     */
    return donation;
  }
}
