class QuadraticFundingService {
  async calculateSumOfSqrt(grantId) {
    // 특정 grant 후원 금액의 제곱근의 합
    let sum = 0.0;

    // DB에서 특정 grantId의 DonationInfo 데이터를 가져온다.
    /*
     */
    // 비동기 작업을 위해 await 사용
    let donations;

    for (const donation of donations) {
      sum += Math.sqrt(donation.getDonationAmount());
    }

    return sum * sum;
  }
  calculateDistributionRate(grantIds) {
    // grantId : rate
    const fundingRate = {};

    let sum = 0.0;

    for (const grantId of grantIds) {
      const rate = calculateSumOfSqrt(grantId);
      sum += rate;
      fundingRate[grantId] = rate;
    }

    for (const grantId of grantIds) {
      const rate = fundingRate[grantId] / sum;
      fundingRate[grantId] = rate;
    }

    return fundingRate;
  }

  distributeFunding(totalMatchingPoolAmount, fundingRate, grants) {
    for (let i = 0; i < grants.length; i++) {
      const grantId = grants[i].getGrantId();
      const rate = fundingRate[grantId];
      grants[i].setMatchingPoolAmount(
        Math.floor(totalMatchingPoolAmount * rate)
      );
    }
    // 각 grant별 totalMatchingPoolAmount를 업데이트 하였으므로 grants를 DB에 저장
    return grants;
  }
}

module.exports = QuadraticFundingService;
