class Grant {
  constructor(grantId, owner, title, description) {
    this.grantId = grantId;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.grantStart = Date.now() + this.getGrantDelay();
    this.grantDeadline = this.grantStart + this.getGrantPeriod();
    this.sponsors = [];
    this.totalAmount = 0;
    this.status = "";
    this.setStatus();
  }

  getGrantDelay() {
    return 604800000; // ms초
  }

  getGrantPeriod() {
    return 2419200000;
  }

  getTotalAmount() {
    return this.totalAmount;
  }

  getTotalSponsors() {
    return this.sponsors.length;
  }

  getStatus() {
    return this.status;
  }

  setStatus() {
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
