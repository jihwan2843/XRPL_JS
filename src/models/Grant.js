class Grant {
  constructor(grantId, owner, title, description) {
    this.grantId = grantId;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.grantStart = Date.now() + this.getGrantDelay();
    this.grantDeadline = this.grantStart + this.getGrantPeriod();
    this.totalDonationAmount = 0;
    this.matchingPoolAmount = 0;
    this.status = "";
    this.setAutoStatus();
  }
  setTitle(title) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  setTotalDonationAmount(totalDonationAmount) {
    this.totalDonationAmount = totalDonationAmount;
  }
  getTotalDonationAmount() {
    return this.totalDonationAmount;
  }

  setStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }

  getGrantDelay() {
    return 604800000; // ms초
  }

  getGrantPeriod() {
    return 2419200000;
  }

  setAutoStatus() {
    const currentTime = Date.now();
    if (currentTime > this.grantDeadline) {
      this.status = "Distributed";
    } else if (currentTime >= this.grantStart) {
      this.status = "Active";
    } else {
      this.status = "Pending";
    }
  }
}

module.exports = Grant;
