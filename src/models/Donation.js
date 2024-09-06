class Donation {
  constructor(
    grantId,
    sponsor,
    donationAmount,
    grantTime,
    escrowCreateTxSequence
  ) {
    this.grantId = grantId;
    this.sponsor = sponsor;
    this.donationAmount = donationAmount;
    this.grantTime = grantTime;
    this.escrowCreateTxSequence = escrowCreateTxSequence;
  }

  getEscrowCreateTxSequence() {
    return this.escrowCreateTxSequence;
  }
  getSponsor() {
    return this.sponsor;
  }
}

module.exports = Donation;
